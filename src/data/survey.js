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
                    name: 'chargeDismissedOrAcquitted',
                    title:
                        'Were all charges in your case dismissed or were you acquitted (found not guilty)?',
                    visibleIf: "{sealingArrestRecordOnly} = 'No'",
                },
                {
                    type: 'radiogroup',
                    choices: ['Ineligible Charge Type', "Don't Know/Not Sure"],
                    isRequired: true,
                    name: 'chargeToSeal',
                    title: 'What charge are you looking to seal??',
                    visibleIf: "{chargeDismissedOrAcquitted} = 'Yes'",
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
                "{sealingArrestRecordOnly} = 'Yes' or {chargeDismissedOrAcquitted} = 'Yes' or {anyNewOffense} = 'Yes'",
            questions: [
                {
                    type: 'comment',
                    name: 'about',
                    title:
                        'Given your responses, your case is eligible for the services provided by Expunge Colorado. Please provide your contact information in the space below',
                },
            ],
        },
        {
            name: 'page6',
            visibleIf: "{chargeDismissedOrAcquitted} = 'No",
            questions: [
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No', "Don't Know/Not Sure"],
                    isRequired: true,
                    name: 'completionOfSentencing',
                    title:
                        'If you were sentenced at the end of your case, have you completed all sentencing, including supervised or unsupervised probation, parole, community corrections, incarceration, etc?',
                },
                {
                    type: 'radiogroup',
                    choices: [
                        'Enough Time Has Passed',
                        'Not Enough Time Has Passed',
                        "Don't Know/Not Sure",
                    ],
                    isRequired: true,
                    name: 'sufficientPeriodOfTime',
                    title:
                        'What is the month & year of your conviction or release from supervision, whichever is later?',
                    visibleIf: "{completionOfSentences} = 'Yes'",
                },
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No', "Don't Know/Not Sure"],
                    isRequired: true,
                    name: 'paidRestitutionAndFees',
                    title:
                        'Have you paid all restitution, fines, court costs, late fees or other fees ordered by the Court in your case?',
                    visibleIf: "{sufficientPeriodOfTime} = 'Enough Time Has Passed'",
                },
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No', "Don't Know/Not Sure"],
                    isRequired: true,
                    name: 'anyNewOffense',
                    title:
                        'Have you been convicted of or charged with another offense after the conviction you are trying to seal?',
                    visibleIf: "{paidRestitutionAndFees} = 'Yes'",
                },
            ],
        },
        {
            name: 'page7',
            visibleIf:
                "{completionOfSentencing} != 'Yes' or {sufficientPeriodOfTime} != 'Enough Time Has Passed' or {paidRestitutionAndFees} != 'Yes' or {anyNewOffense} != 'Yes'",
            questions: [
                {
                    type: 'comment',
                    name: 'about',
                    title:
                        'Given your responses, additional information will need to be collected to determine elibility. Please provide your contact information in the space below',
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
