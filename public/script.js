// HTML elements select karna
const welcomeSection = document.getElementById("welcomeSection");
const feedbackSection = document.getElementById("feedbackSection");
const successSection = document.getElementById("successSection");
const allFeedbackSection = document.getElementById("allFeedbackSection");
const giveFeedbackBtn = document.getElementById("giveFeedbackBtn");
const feedbackForm = document.getElementById("feedbackForm");
const viewFeedbackBtn = document.getElementById("viewFeedbackBtn");
const backBtn = document.getElementById("backBtn");
const feedbackList = document.getElementById("feedbackList");

//Give Feedback button par click

giveFeedbackBtn.addEventListener("click", () => {
  welcomeSection.hidden = true;
  feedbackSection.hidden = false;
});

// Feedback form submit karna

feedbackForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;
//   console.log(name);
//   console.log(rating);
//   console.log(comment);

  const feedbackData = {
    name: name,
    rating: rating,
    comment: comment,
  };
  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(feedbackData),
    });
    console.log("Response status:", response.status);

    if (response.ok) {
      feedbackSection.hidden = true;
      successSection.hidden = false;
      feedbackForm.reset();
    } else {
      console.log("Failed to submit feedback");
    }
  } catch (error) {
    console.log("Error:", error);
    alert("Server se connection nahi ho paya!");
  }
});
// 4. View All Student Feedback button
viewFeedbackBtn.addEventListener("click",()=>{
    successSection.hidden = true;
    allFeedbackSection.hidden = false;
    getFeedback()
})
// 5. MongoDB se feedback get karna
async function getFeedback() {
    try {
        const response = await fetch("/api/feedback");
        const result = await response.json();
        if (response.ok) {
            feedbackList.innerHTML = "";
            result.feedbacks.forEach((feedback) => {
                const card = document.createElement("div");
                card.className = "feedback-card";
                card.innerHTML = `
                    <h3>${feedback.name}</h3>
                    <p>Rating: ${feedback.rating} ⭐</p>
                    <p>${feedback.comment}</p>
                `;
                feedbackList.appendChild(card);

            });

        }

    } catch (error) {
        console.log("Error:", error);
    }
}
// Back to Home button

backBtn.addEventListener("click", () => {

    allFeedbackSection.hidden = true;

    welcomeSection.hidden = false;

});