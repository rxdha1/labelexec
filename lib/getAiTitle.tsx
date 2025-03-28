const getAiTitle = async (question: string) => {
  try {
    const response = await fetch("/api/get_chat_title", {
      method: "POST",
      body: JSON.stringify({ question }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) return "";
    return data.title;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default getAiTitle;
