export type TravelOption = {
    id: number;
    title: string;
    desc: string;
    icon: string;
    people: string;
};

export const SelectTravelerList:TravelOption[]=[
    {
        "id": 1,
        "title": "Just Me",
        "desc": "A sole travels in exploration",
        "icon": "✈️",
        "people": "1"
    },
    {
        "id": 2,
        "title": "A Couple",
        "desc": "Two travels in Honeymoon",
        "icon": "🥂",
        "people": "2 People"
    },
    {
        "id": 3,
        "title": "Family",
        "desc": "Vacation with family and relax",
        "icon": "🏡",
        "people": "3 to 5 People"
    },
    {
        "id": 4,
        "title": "Friends",
        "desc": "A group of fun loving friends exploring together",
        "icon": "👯",
        "people": "4 to 8 People"
    }
]