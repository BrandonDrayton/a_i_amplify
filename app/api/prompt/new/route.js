import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res, next) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt: prompt, tag: tag });
    await newPrompt.save();

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};