const openai = require("../config/openaiConfig");

async function generateStory(req, res) {
  console.log(req.body.storyDetails.childAge);
  const { childAge, length, theme, subject, characters, additionalInfo } =
    req.body.storyDetails;
  console.log(
    `Please write a story on the theme of ${theme} for my child who is ${childAge}`
  );
  try {
    const story = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Can you come up with a bedtime story suitable for a child of ${childAge} years old. The theme should be ${theme}, the subject is ${subject}. Please include the characters ${characters} and take into accoutn the following keywords/information: ${additionalInfo}. The story should be about ${length} minute(s) long. Please also provide a title for this story and put the title as the first paragraph`,
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 200,
    });

    if (story.choices[0].message.content) {
      // console.log(story.choices[0].message);
      // story.choices[0].message.content);
      res.status(200).json({
        story: story.choices[0].message,
      });
    } else {
      console.error("Invalid response structure:", story);
    }
  } catch (error) {
    console.error("Error occurred while generating meta description:", error);
  }
}

module.exports = { generateStory };
