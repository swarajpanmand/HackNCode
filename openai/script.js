const conversationElement = document.getElementById("conversation");

async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
  
    // Add user message to the conversation
    addMessage("You", userInput);
  
    try {
      // Send user message to the server
      const response = await axios.post("/generate_response", { message: userInput });
  
      // Add ChatGPT-2 response to the conversation
      addMessage("ChatGPT-2", response.data.response);
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage("Error", "Failed to generate response. Please try again later.");
    }
  }
  

function addMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    conversationElement.appendChild(messageElement);
}
