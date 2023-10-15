export const ADAPTIVE_CARD = (qAmount: any, name: any, deferralText: any) => {
    function generateFlightNumber() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let airlineCode = "";
      for (let i = 0; i < 2; i++) {
        airlineCode += letters.charAt(
          Math.floor(Math.random() * letters.length)
        );
      }
      let flightNumber = Math.floor(Math.random() * 900) + 100; // generates a random number between 100 and 999
      return airlineCode + flightNumber;
    }
  return {
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.5",
    type: "AdaptiveCard",
    body: [
      {
        type: "TextBlock",
        text: `✈️ Your Flight Itinerary`,
        wrap: true,
        style: "heading",
      },
      {
        type: "TextBlock",
        text: generateFlightNumber(),
        weight: "Bolder",
        wrap: true,
      },
      {
        type: "TextBlock",
        text: `${name}`,
        separator: true,
        wrap: true,
        horizontalAlignment: "Center",
      },
      {
        type: "TextBlock",
        text: `${qAmount} passengers`,
        weight: "Bolder",
        horizontalAlignment: "Right",
        spacing: "Medium",
        wrap: true,
      },
      {
        type: "TextBlock",
        text: `${new Date().toUTCString()}`,
        weight: "Bolder",
        spacing: "None",
        wrap: true,
      },
      {
        type: "ColumnSet",
        separator: true,
        columns: [
          {
            type: "Column",
            width: 1,
            items: [
              {
                type: "TextBlock",
                text: "Departs From",
                wrap: true,
                style: "default",
                weight: "Bolder",
                color: "Light",
              },
              {
                type: "TextBlock",
                size: "ExtraLarge",
                color: "Accent",
                text: "LIFE",
                spacing: "None",
                wrap: true,
              },
            ],
          },
          {
            type: "Column",
            width: "auto",
            verticalContentAlignment: "Center",
            items: [
              {
                type: "Image",
                url: "https://adaptivecards.io/content/airplane.png",
                altText: "Flight to",
                size: "Small",
                spacing: "None",
              },
            ],
          },
          {
            type: "Column",
            width: 1,
            items: [
              {
                type: "TextBlock",
                text: "Arrives At",
                wrap: true,
                horizontalAlignment: "Right",
                style: "default",
                weight: "Bolder",
                color: "Light",
              },
              {
                type: "TextBlock",
                size: "ExtraLarge",
                color: "Accent",
                $when: "${Segments[0].DestinationStation == 11235}",
                text: "PARADISE",
                horizontalAlignment: "Right",
                spacing: "None",
                wrap: true,
              },
            ],
          },
        ],
      },
      {
        type: "TextBlock",
        text: deferralText,
        wrap: true,
        horizontalAlignment: "Center",
        maxLines: 10,
      },
    ],
  };
}


