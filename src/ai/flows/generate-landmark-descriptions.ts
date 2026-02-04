'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate short, engaging descriptions for landmarks on the map.
 *
 * The flow takes a landmark name as input and returns a one-sentence description for it.
 *
 * @interface GenerateLandmarkDescriptionsInput - Input type for the generateLandmarkDescriptions function.
 * @interface GenerateLandmarkDescriptionsOutput - Output type for the generateLandmarkDescriptions function.
 * @function generateLandmarkDescriptions -  A function that handles the landmark description generation process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLandmarkDescriptionsInputSchema = z.object({
  landmarkName: z.string().describe('The name of the landmark to generate a description for.'),
});
export type GenerateLandmarkDescriptionsInput = z.infer<typeof GenerateLandmarkDescriptionsInputSchema>;

const GenerateLandmarkDescriptionsOutputSchema = z.object({
  description: z.string().describe('A one-sentence description of the landmark.'),
});
export type GenerateLandmarkDescriptionsOutput = z.infer<typeof GenerateLandmarkDescriptionsOutputSchema>;

export async function generateLandmarkDescriptions(input: GenerateLandmarkDescriptionsInput): Promise<GenerateLandmarkDescriptionsOutput> {
  return generateLandmarkDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLandmarkDescriptionsPrompt',
  input: {schema: GenerateLandmarkDescriptionsInputSchema},
  output: {schema: GenerateLandmarkDescriptionsOutputSchema},
  prompt: `You are a creative copywriter tasked with creating engaging one-sentence descriptions for landmarks on an interactive adventure map.

  Generate a description for the following landmark:

  Landmark Name: {{{landmarkName}}}
  `,
});

const generateLandmarkDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateLandmarkDescriptionsFlow',
    inputSchema: GenerateLandmarkDescriptionsInputSchema,
    outputSchema: GenerateLandmarkDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
