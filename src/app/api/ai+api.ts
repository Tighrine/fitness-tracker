import { Content, GoogleGenAI, Part } from "@google/genai"

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
    const { exerciseName } = await req.json();
    if (!exerciseName) {
        return Response.json({error: "Exercise name is required"}, { status: 400 });
    }

    const prompt = `
        You are a fitness coach.
        You are given an exercise, provide clear instructions on how to perform the exercise. Include if any equipment is required. Explain the exercise in detail and for a beginner.

        The exercise name is: ${exerciseName}

        Keep it short and concise. Use markdown formatting.

        Use the following format:

        ## Equipment Required

        ## Instructions

        ### Tips

        ### Variations

        ### Safety

        Keep spacing between the headings and the content.

        Always use headings and subheadings.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a fitness coach. Provide clear and concise instructions for exercises.",
                maxOutputTokens: 1000,
                temperature: 0.5,
            }
        });
        if (!response.candidates || response.candidates.length === 0) {
            return Response.json({ error: "No response from AI" }, { status: 500 });
        }
        console.log("AI response:", JSON.stringify(response.candidates[0].content), null, 2);
        const message = response.candidates[0].content.parts[0].text;
        return Response.json({ message });
    } catch (error) {
        console.error("Error generating AI response:", error);
        return Response.json({ error: "Failed to generate AI response" }, { status: 500 });
    }
};

