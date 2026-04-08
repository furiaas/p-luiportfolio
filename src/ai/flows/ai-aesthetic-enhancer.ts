'use server';
/**
 * @fileOverview A Genkit flow for enhancing uploaded project visuals with a unique experimental aesthetic.
 *
 * - applyAestheticEnhancements - A function that applies artistic filters and overlays to images or generates videos with the specified aesthetic.
 * - AiAestheticEnhancerInput - The input type for the applyAestheticEnhancements function.
 * - AiAestheticEnhancerOutput - The return type for the applyAestheticEnhancements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {MediaPart} from 'genkit';
import {Readable} from 'stream';

const AiAestheticEnhancerInputSchema = z.object({
  mediaContent: z
    .string()
    .describe(
      "The input content. If `mediaType` is 'image' or 'video_from_image', this is a data URI of an image (e.g., 'data:image/jpeg;base64,<encoded_data>'). If `mediaType` is 'video_from_text', this is a text description for the video."
    ),
  mediaType: z
    .enum(['image', 'video_from_image', 'video_from_text'])
    .describe(
      "Specifies the type of media input and desired output: 'image' for image enhancement, 'video_from_image' for animating an image, or 'video_from_text' for generating a video from a text description."
    ),
  effectDescription: z
    .string()
    .describe(
      "A description of the desired artistic effects to apply (e.g., glitch, granular textures, zine-inspired collage overlays, neon colors, bold typography)."
    ),
});
export type AiAestheticEnhancerInput = z.infer<typeof AiAestheticEnhancerInputSchema>;

const AiAestheticEnhancerOutputSchema = z.object({
  processedMediaDataUri: z
    .string()
    .describe("Data URI of the processed image or generated video."),
});
export type AiAestheticEnhancerOutput = z.infer<typeof AiAestheticEnhancerOutputSchema>;

export async function applyAestheticEnhancements(
  input: AiAestheticEnhancerInput
): Promise<AiAestheticEnhancerOutput> {
  return aiAestheticEnhancerFlow(input);
}

/**
 * Helper function to convert a video stream from a MediaPart URL to a base64 data URI.
 * This involves fetching the video and encoding its binary content.
 */
async function videoStreamToBase64DataUri(videoMediaPart: MediaPart): Promise<string> {
  const fetch = (await import('node-fetch')).default;
  const videoDownloadResponse = await fetch(
    `${videoMediaPart.media!.url}&key=${process.env.GEMINI_API_KEY}`
  );

  if (
    !videoDownloadResponse ||
    videoDownloadResponse.status !== 200 ||
    !videoDownloadResponse.body
  ) {
    throw new Error('Failed to fetch video for base64 encoding.');
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    Readable.from(videoDownloadResponse.body!)
      .on('data', chunk => chunks.push(Buffer.from(chunk)))
      .on('error', err => reject(err))
      .on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(`data:video/mp4;base64,${buffer.toString('base64')}`);
      });
  });
}

const aiAestheticEnhancerFlow = ai.defineFlow(
  {
    name: 'aiAestheticEnhancerFlow',
    inputSchema: AiAestheticEnhancerInputSchema,
    outputSchema: AiAestheticEnhancerOutputSchema,
  },
  async (input) => {
    let outputMediaUri: string;

    if (input.mediaType === 'image') {
      if (!input.mediaContent) {
        throw new Error("mediaContent is required for 'image' mediaType.");
      }
      const {output} = await ai.generate({
        model: googleAI.model('gemini-2.5-flash-image'),
        prompt: [
          {media: {url: input.mediaContent}},
          {
            text: `Apply the following artistic aesthetic enhancements to this image: ${input.effectDescription}. Focus on glitch effects, granular textures, zine-inspired collage overlays, vibrant colors, and bold typography. Make it look experimental, artistic, and unique. Output only the image, no extra text.`,
          },
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });
      if (!output || !output.media) {
        throw new Error('Image generation failed or returned no media.');
      }
      outputMediaUri = output.media.url;
    } else if (input.mediaType.startsWith('video_')) {
      let promptParts: any[];
      let config: Record<string, any> = {
        durationSeconds: 6, // Configurado para 6 segundos conforme solicitado
        aspectRatio: '16:9',
        personGeneration: 'allow_adult',
      };

      if (input.mediaType === 'video_from_image') {
        if (!input.mediaContent) {
          throw new Error("mediaContent (image reference) is required for 'video_from_image' mediaType.");
        }
        promptParts = [
          {
            text: `Generate a short video animating the subject of this image with the following artistic aesthetic: ${input.effectDescription}. Incorporate glitch effects, granular textures, zine-inspired collage overlays, vibrant colors, and bold typography. Make it experimental, artistic, and unique.`,
          },
          {
            media: {
              contentType: input.mediaContent.split(';')[0].split(':')[1],
              url: input.mediaContent,
            },
          },
        ];
      } else { // video_from_text
        if (!input.mediaContent) {
           throw new Error("mediaContent (text description) is required for 'video_from_text' mediaType.");
        }
        promptParts = [
          `Generate a short video based on this description: "${input.mediaContent}". Apply the following artistic aesthetic: ${input.effectDescription}. Focus on glitch effects, granular textures, zine-inspired collage overlays, vibrant colors, and bold typography. Make it experimental, artistic, and unique. `,
        ];
      }

      let { operation } = await ai.generate({
        model: googleAI.model('veo-2.0-generate-001'), // Veo 2 permite configurar a duração exata
        prompt: promptParts,
        config: config,
      });

      if (!operation) {
        throw new Error('Expected the model to return an operation for video generation.');
      }

      while (!operation.done) {
        operation = await ai.checkOperation(operation);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      if (operation.error) {
        throw new Error('Video generation failed: ' + operation.error.message);
      }

      const videoMediaPart = operation.output?.message?.content.find((p) => !!p.media);
      if (!videoMediaPart || !videoMediaPart.media) {
        throw new Error('Failed to find the generated video media part.');
      }

      outputMediaUri = await videoStreamToBase64DataUri(videoMediaPart);
    } else {
      throw new Error(`Unsupported mediaType: ${input.mediaType}`);
    }

    return { processedMediaDataUri: outputMediaUri };
  }
);
