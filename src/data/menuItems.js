export const initialMenuItems = [
    {
        id: 1,
        title: 'Kylling med kartofler og grøntsager',
        description: 'Saftig kyllingefilet serveret med kartofler og sæsonens grøntsager',
        nutrition: {
            calories: 380,
            protein: 25,
            carbs: 40,
            fat: 12
        },
        allergens: ['Gluten'],
        ingredients: ['Kyllingefilet', 'Kartofler', 'Sæsonens grøntsager', 'Smør', 'Salt', 'Peber'],
        recipe: [
            'Steg kyllingen ved medium varme i 6-8 minutter på hver side',
            'Kog kartoflerne i letsaltet vand i 15-20 minutter',
            'Damp grøntsagerne i 5-7 minutter',
            'Server det hele sammen med en lille klat smør på kartoflerne'
        ]
    },
    {
        id: 2,
        title: 'Laksefrikadeller med dildkartofler',
        description: 'Hjemmelavede laksefrikadeller serveret med dildkartofler og citron',
        nutrition: {
            calories: 420,
            protein: 28,
            carbs: 35,
            fat: 18
        },
        allergens: ['Fisk', 'Æg'],
        ingredients: ['Hakket laks', 'Løg', 'Æg', 'Rasp', 'Kartofler', 'Frisk dild', 'Citron'],
        recipe: [
            'Bland hakket laks med løg, æg og rasp',
            'Form frikadeller og steg dem på panden',
            'Kog kartoflerne og vend dem med frisk dild',
            'Server med en skive citron'
        ]
    },
    {
        id: 3,
        title: 'Vegetarisk pasta med tomatsauce',
        description: 'Frisk pasta med hjemmelavet tomatsauce og sæsonens grøntsager',
        nutrition: {
            calories: 350,
            protein: 12,
            carbs: 65,
            fat: 8
        },
        allergens: ['Gluten'],
        ingredients: ['Pasta', 'Løg', 'Hvidløg', 'Hakkede tomater', 'Olivenolie', 'Salt', 'Peber', 'Krydderier', 'Sæsonens grøntsager'],
        recipe: [
            'Kog pastaen i letsaltet vand',
            'Steg løg og hvidløg i olivenolie',
            'Tilsæt hakkede tomater og krydderier',
            'Lad saucen simre i 20 minutter',
            'Bland pastaen med saucen og server'
        ]
    }
];