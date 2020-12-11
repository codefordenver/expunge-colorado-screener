const SURVEY_DATA = {
    title: 'Tell us some more about your case.',
    pages: [
        {
            name: 'page1',
            questions: [
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No'],
                    isRequired: true,
                    name: 'skipToEnd',
                    title: 'Would you like to skip to the end?',
                },
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No'],
                    isRequired: true,
                    name: 'coloradoArrest',
                    title: 'Did your arrest or charge take place in Colorado?',
                },
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No'],
                    isRequired: true,
                    name: 'over18',
                    title: 'Were you over 18 at the time of the arrest or charge?',
                    visibleIf: "{coloradoArrest} = 'Yes'",
                },
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No', "Don't Know/Not Sure"],
                    isRequired: true,
                    name: 'federalOrMunicipal',
                    title: 'Was your case a federal or muncipal case?',
                    visibleIf: "{over18} = 'Yes'",
                },
            ],
        },
        {
            name: 'page2',
            visibleIf:
                "{skipToEnd} = 'No' and {coloradoArrest} = 'Yes' and {over18} = 'Yes' and {federalOrMunicipal} != 'Yes'",
            questions: [
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No'],
                    isRequired: true,
                    name: 'sealingArrestRecordOnly',
                    title:
                        'Were you arrested, but not charged & seeking to seal arrest record only?',
                },
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No'],
                    isRequired: true,
                    name: 'caseDismissedOrAcquitted',
                    title:
                        'Were all charges in your case dismissed or were you acquitted (found not guilty)?',
                    visibleIf: "{sealingArrestRecordOnly} = 'No'",
                },
            ],
        },
        {
            name: 'page3',
            visibleIf: "{skipToEnd} = 'Yes'",
            questions: [
                {
                    type: 'comment',
                    name: 'about',
                    title:
                        'Please tell us about your main requirements for Survey library',
                },
            ],
        },
        {
            name: 'page4',
            visibleIf:
                "{coloradoArrest} = 'No' or {over18} = 'No' or {federalOrMunicipal} = 'Yes'",
            questions: [
                {
                    type: 'comment',
                    name: 'about',
                    title:
                        'Given your responses, your case is not eligible for the services provided by Expunge Colorado.',
                },
            ],
        },
        {
            name: 'page5',
            visibleIf:
                "{sealingArrestRecordOnly} = 'Yes' or {caseDismissedOrAcquitted} = 'Yes'",
            questions: [
                {
                    type: 'comment',
                    name: 'about',
                    title:
                        'Given your responses, your case is eligible for the services provided by Expunge Colorado. Please provide your contact information in the space below',
                },
            ],
        },
    ],
};

// {
//     type: 'checkbox',
//     choices: ['Bootstrap', 'Foundation'],
//     hasOther: true,
//     isRequired: true,
//     name: 'framework',
//     title: 'What front-end framework do you use?',
//     visibleIf: "{frameworkUsing} = 'Yes'",
// },

export default SURVEY_DATA;
