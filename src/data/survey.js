const SURVEY_DATA = {
    title: 'Tell us some more about your case.',
    // triggers: [
    //     {
    //         type: 'complete',
    //         expression: "{coloradoArrest} = 'No'"
    //     }
    // ],
    pages: [
        {
            name: 'preliminaryQuestions',
            questions: [
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No'],
                    isRequired: true,
                    name: 'coloradoArrest',
                    title: 'Did your arrest or charge take place in Colorado?',
                    // resultMap: {
                    //     'Yes': 'Eligible',
                    //     'No': 'Ineligible'
                    // }
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
                    choices: ['Yes', 'No', 'Not Sure'],
                    isRequired: true,
                    name: 'federalCase',
                    title: 'Was your case a federal case?',
                    visibleIf: "{over18} = 'Yes' and {coloradoArrest} = 'Yes'",
                },
            ],
        },
        {
            name: 'sealingArrestsAndCharges',
            visibleIf:
                "{coloradoArrest} = 'Yes' and {over18} = 'Yes' and {federalCase} = 'No'",
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
                    choices: ['Yes', 'No', 'Not Sure'],
                    isRequired: true,
                    name: 'chargeDismissedOrAcquitted',
                    title:
                        'Were all charges in your case dismissed or were you acquitted (found not guilty)?',
                    visibleIf: "{sealingArrestRecordOnly} = 'No'",
                },
                {
                    type: 'radiogroup',
                    choices: [
                        'Eligible Charge Type',
                        'Ineligible Charge Type',
                        'Not Sure',
                    ],
                    isRequired: true,
                    name: 'chargeToSeal',
                    title: 'What conviction are you looking to seal?',
                    visibleIf: "{chargeDismissedOrAcquitted} = 'No'",
                },
            ],
        },
        {
            name: 'convictionRequirements',
            visibleIf:
                "{chargeToSeal} = 'Eligible Charge Type' and {chargeDismissedOrAcquitted} = 'No'",
            questions: [
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No', 'Not Sure'],
                    isRequired: true,
                    name: 'completedSentencing',
                    title:
                        'If you were sentenced at the end of your case, have you completed all sentencing, including supervised or unsupervised probation, parole, community corrections, incarceration, etc?',
                },
                {
                    type: 'radiogroup',
                    choices: [
                        'Enough Time Has Passed',
                        'Not Enough Time Has Passed',
                        'Not Sure',
                    ],
                    isRequired: true,
                    name: 'enoughTimePassed',
                    title:
                        'In most cases, a certain period of time must go by from the date of conviction, or the final date of completing a sentence, before you can apply to seal your record. What is the month & year you completed your sentencing/supervision?',
                    visibleIf: "{completedSentencing} = 'Yes'",
                },
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No', 'Not Sure'],
                    isRequired: true,
                    name: 'paidRestitutionAndFees',
                    title:
                        'Have you paid all restitution, fines, court costs, late fees or other fees ordered by the Court in your case?',
                    visibleIf: "{enoughTimePassed} = 'Enough Time Has Passed'",
                },
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No', 'Not Sure'],
                    isRequired: true,
                    name: 'attemptedToSeal',
                    title:
                        'Have you attempted to seal your record for this conviction within the past 12 months?',
                    visibleIf: "{paidRestitutionAndFees} = 'Yes'",
                },
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No', 'Not Sure'],
                    isRequired: true,
                    name: 'anyNewOffense',
                    title:
                        'Have you been convicted of or charged with another offense after the conviction you are trying to seal?',
                    visibleIf: "{attemptedToSeal} = 'No'",
                },
            ],
        },
        {
            name: 'ineligibleStatus',
            visibleIf:
                "{coloradoArrest} = 'No' or {over18} = 'No' or {federalCase} = 'Yes' or {chargeToSeal} = 'Ineligible Charge Type' or {completedSentencing} = 'No' or {enoughTimePassed} = 'Not Enough Time Has Passed' or {paidRestitutionAndFees} = 'No' or {attemptedToSeal} = 'Yes'",
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
            name: 'additionalInfoRequired',
            visibleIf:
                "{federalCase} = 'Not Sure' or {chargeToSeal} = 'Not Sure' or {completedSentencing} = 'Not Sure' or {enoughTimePassed} = 'Not Sure' or {chargeDismissedOrAcquitted} = 'Not Sure' or {paidRestitutionAndFees} = 'Not Sure' or {anyNewOffense} = 'Yes' or {anyNewOffense} = 'Not Sure'",
            questions: [
                {
                    type: 'comment',
                    name: 'about',
                    title:
                        'Given your responses, additional information will need to be collected to determine elibility. Please provide your contact information in the space below',
                },
            ],
        },
        {
            name: 'eligibleStatus',
            visibleIf:
                "{sealingArrestRecordOnly} = 'Yes' or {chargeDismissedOrAcquitted} = 'Yes' or {anyNewOffense} = 'No'",
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
