const SURVEY_DATA = {
    title: 'Tell us some more about your case.',
    clearInvisibleValues: 'onHidden',
    triggers: [
        {
            type: 'setvalue',
            expression:
                "{coloradoArrest} = 'No' or {over18} = 'No' or {federalCase} = 'Yes' or {chargeToSeal} = 'Ineligible' or {completedSentencing} = 'No' or {enoughTimePassed} = 'Not Enough Time Has Passed' or {paidRestitutionAndFees} = 'No' or {attemptedToSeal} = 'Yes'",
            setToName: 'outcome',
            setValue: 'ineligible',
        },
        {
            type: 'setvalue',
            expression:
                "{sealingArrestRecordOnly} = 'Yes' or {chargeDismissedOrAcquitted} = 'Yes' or {anyNewOffense} = 'No'",

            setToName: 'outcome',
            setValue: 'eligible',
        },
        {
            type: 'setvalue',
            expression:
                "{federalCase} = 'Not Sure' or {chargeToSeal} = 'Not Sure' or {completedSentencing} = 'Not Sure' or {enoughTimePassed} = 'Not Sure' or {chargeDismissedOrAcquitted} = 'Not Sure' or {paidRestitutionAndFees} = 'Not Sure' or {anyNewOffense} = 'Yes' or {anyNewOffense} = 'Not Sure'",
            setToName: 'outcome',
            setValue: 'needInfo',
        },
    ],
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
                    visibleIf: "{over18} = 'Yes'",
                },
            ],
        },
        {
            name: 'sealingArrestsAndCharges',
            visibleIf: "{federalCase} = 'No'",
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
                    type: 'dropdown',
                    choices: [
                        { value: 'Ineligible', text: 'Class 1 Felony' },
                        { value: 'Ineligible', text: 'Class 2 Felony' },
                        { value: 'Ineligible', text: 'Class 3 Felony' },
                        { value: 'Ineligible', text: 'Class 1 Drug Felony' },
                        { value: 'Ineligible', text: 'Felony Sex Offense' },
                        { value: 'Ineligible', text: 'Felony Drug Special Offense' },
                        { value: 'Ineligible', text: 'Felony Child Abuse' },
                        { value: 'Ineligible', text: 'Felony Domestic Violence' },
                        { value: 'Ineligible', text: 'Felony Murder or Manslaughter' },
                        {
                            value: 'Ineligible',
                            text: 'Felony Vehicular Homicide or Assault',
                        },
                        { value: 'Ineligible', text: 'Felony Menacing' },
                        {
                            value: 'Ineligible',
                            text: 'Felony First or Second Degree Kidnapping',
                        },
                        { value: 'Ineligible', text: 'Felony Robbery' },
                        {
                            value: 'Ineligible',
                            text: 'Felony First or Second Degree Burglary of a Dwelling',
                        },
                        {
                            value: 'Ineligible',
                            text:
                                'Felony Retaliating or Intimidating a Witness or Victim',
                        },
                        { value: 'Ineligible', text: 'Misdemeanor Traffic Offense' },
                        { value: 'Ineligible', text: 'DUI or DWAI' },
                        { value: 'Eligible', text: 'Petty Offense' },
                        { value: 'Eligible', text: 'Petty Drug Offense' },
                        { value: 'Eligible', text: 'Class 2 Misdemeanor' },
                        { value: 'Eligible', text: 'Class 3 Misdemeanor' },
                        { value: 'Eligible', text: 'Drug Misdemeanor Offense' },
                        { value: 'Eligible', text: 'F4' },
                        { value: 'Eligible', text: 'F5' },
                        { value: 'Eligible', text: 'F6' },
                        { value: 'Eligible', text: 'DF3' },
                        { value: 'Eligible', text: 'DF4' },
                        { value: 'Eligible', text: 'M1' },
                        { value: 'Eligible', text: 'Municipal Offense' },
                        { value: 'Eligible', text: 'DF2' },
                        { value: 'Not Sure', text: 'Not Sure' },
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
            visibleIf: "{chargeToSeal} = 'Eligible'",
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
    ],
};

export default SURVEY_DATA;
