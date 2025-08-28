// regions.js
export const regionsData = [
  {
    name: "Nasik",
    children: [
      {
        name: "Satara",
        children: [
          {
            name: "Janakpur",
            children: [
              {
                name: "Pongari",
                membersTrend: {
                  annual: [100, 120, 130, 140],
                  monthly: [10, 20, 15, 25],
                },
                collectionTrend: {
                  annual: [200, 250, 270, 300],
                  monthly: [20, 30, 25, 35],
                },
              },
              {
                name: "Sillwad",
                membersTrend: {
                  annual: [90, 100, 110, 130],
                  monthly: [12, 15, 18, 20],
                },
                collectionTrend: {
                  annual: [210, 220, 240, 260],
                  monthly: [22, 28, 26, 32],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Konkan",
    membersTrend: {
      annual: [150, 170, 180, 190],
      monthly: [15, 25, 22, 30],
    },
    collectionTrend: {
      annual: [250, 270, 290, 310],
      monthly: [28, 32, 35, 40],
    },
  },
];
