// form inputs
const storyDetails = document.querySelector(".story-details");

// output
const story = document.querySelector(".story");
const storyContainer = document.querySelector(".story-container");
const newStoryButton = document.querySelector(".new-story-btn");

storyDetails.addEventListener("submit", async (e) => {
  console.log("Story details submitted");
  console.log(`Story Theme: ${JSON.stringify(storyDetails.theme.value)}`);
  e.preventDefault();
  try {
    const res = await fetch("/story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storyDetails: {
          childAge: storyDetails.childAge.value,
          length: storyDetails.storyLength.value,
          theme: storyDetails.theme.value,
          subject: storyDetails.subject.value,
          characters: storyDetails.characters.value,
          additionalInfo: storyDetails.additionalInfo.value,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    const paragraphs = data.story.content.split("\n\n");

    paragraphs.forEach((paragraph) => {
      const trimmedParagraph = paragraph.trim();

      if (trimmedParagraph) {
        if (paragraphs.indexOf(paragraph) == 0) {
          const title = document.querySelector(".story-title");
          title.textContent = paragraph.replace("Title: ", "");
        } else {
          const p = document.createElement("P");

          p.textContent = trimmedParagraph;

          story.appendChild(p);
        }
      }
    });
    storyContainer.classList.remove("inactive");
    storyDetails.classList.add("inactive");
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

newStoryButton.addEventListener("click", () => {
  console.log(`new story btn clicked`);
  // storyContainer.classList.add("inactive");
  // storyDetails.classList.remove("inactive");

  // storyDetails.reset();
  location.reload();
});
