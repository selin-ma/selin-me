export async function POST(req: Request) {
  const { message, conversationId } = await req.json();

  const res = await fetch('https://api.dify.ai/v1/chat-messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: {},
      query: message,
      conversation_id: conversationId || '',
      response_mode: 'blocking',
      user: 'portfolio-visitor',
    }),
  });

  const data = await res.json();
  return Response.json({
    answer: data.answer,
    conversationId: data.conversation_id,
  });
}
