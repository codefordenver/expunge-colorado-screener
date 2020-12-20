import * as Survey from 'survey-react';

function hasEnoughTimePassed(params) {
    if (params[1]) {
        let charge = params[0];
        let date = new Date(params[1]);
        let dateYear = date.getFullYear() + charge;
        date.setFullYear(dateYear);
        if (date < Date.now()) {
            return 'Yes';
        } else {
            return 'No';
        }
    }
}

function chargeEligibility(params) {
    const chargesMap = {
        'Class 1 Felony': 'Ineligible',
        'Class 2 Felony': 'Ineligible',
        'Class 3 Felony': 'Ineligible',
        'Class 1 Drug Felony': 'Ineligible',
        'Felony Sex Offense': 'Ineligible',
        'Felony Drug Special Offense': 'Ineligible',
        'Felony Child Abuse': 'Ineligible',
        'Felony Domestic Violence': 'Ineligible',
        'Felony Murder or Manslaughter': 'Ineligible',
        'Felony Vehicular Homicide or Assault': 'Ineligible',
        'Felony Menacing': 'Ineligible',
        'Felony First or Second Degree Kidnapping': 'Ineligible',
        'Felony Robbery': 'Ineligible',
        'Felony First or Second Degree Burglary of a Dwelling': 'Ineligible',
        'Felony Retaliating or Intimidating a Witness or Victim': 'Ineligible',
        'Misdemeanor Traffic Offense': 'Ineligible',
        'DUI or DWAI': 'Ineligible',
        'Petty Offense': 1,
        'Petty Drug Offense': 1,
        'Class 2 Misdemeanor': 2,
        'Class 3 Misdemeanor': 2,
        'Drug Misdemeanor Offense': 2,
        F4: 3,
        F5: 3,
        F6: 3,
        DF3: 3,
        DF4: 3,
        M1: 3,
        'Municipal Offense': 3,
        DF2: 5,
        'Not Sure': 'Not Sure',
    };

    return chargesMap[params[0]];
}

Survey.FunctionFactory.Instance.register('hasEnoughTimePassed', hasEnoughTimePassed);
Survey.FunctionFactory.Instance.register('chargeEligibility', chargeEligibility);

const SURVEY_DATA = {
    title: 'Tell us some more about your case.',
    clearInvisibleValues: 'onHidden',
    triggers: [
        {
            type: 'setvalue',
            expression:
                "{coloradoArrest} = 'No' or {over18} = 'No' or {federalCase} = 'Yes' or chargeEligibility({chargeToSeal}) = 'Ineligible' or {completedSentencing} = 'No' or hasEnoughTimePassed(chargeEligibility({chargeToSeal}), {enoughTimePassed}) = 'No' or {paidRestitutionAndFees} = 'No' or {attemptedToSeal} = 'Yes'",
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
                "{federalCase} = 'Not Sure' or {chargeToSeal} = 'Not Sure' or {completedSentencing} = 'Not Sure' or {chargeDismissedOrAcquitted} = 'Not Sure' or {paidRestitutionAndFees} = 'Not Sure' or {anyNewOffense} = 'Yes' or {anyNewOffense} = 'Not Sure'",
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
                        'Class 1 Felony',
                        'Class 2 Felony',
                        'Class 3 Felony',
                        'Class 1 Drug Felony',
                        'Felony Sex Offense',
                        'Felony Drug Special Offense',
                        'Felony Child Abuse',
                        'Felony Domestic Violence',
                        'Felony Murder or Manslaughter',
                        'Felony Vehicular Homicide or Assault',
                        'Felony Menacing',
                        'Felony First or Second Degree Kidnapping',
                        'Felony Robbery',
                        'Felony First or Second Degree Burglary of a Dwelling',
                        'Felony Retaliating or Intimidating a Witness or Victim',
                        'Misdemeanor Traffic Offense',
                        'DUI or DWAI',
                        'Petty Offense',
                        'Petty Drug Offense',
                        'Class 2 Misdemeanor',
                        'Class 3 Misdemeanor',
                        'Drug Misdemeanor Offense',
                        'F4',
                        'F5',
                        'F6',
                        'DF3',
                        'DF4',
                        'M1',
                        'Municipal Offense',
                        'DF2',
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
            visibleIf: 'chargeEligibility({chargeToSeal}) > 0',
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
                    type: 'text',
                    inputType: 'date',
                    isRequired: true,
                    name: 'enoughTimePassed',
                    title:
                        'In most cases, a certain period of time must go by from the date of conviction, or the final date of completing a sentence, before you can apply to seal your record. What is the month & year you completed your sentencing/supervision?',
                    visibleIf: "{completedSentencing} = 'Yes'",
                },
            ],
        },
        {
            name: 'withinTimeFrame',
            visibleIf:
                "hasEnoughTimePassed(chargeEligibility({chargeToSeal}), {enoughTimePassed}) = 'Yes'",
            questions: [
                {
                    type: 'radiogroup',
                    choices: ['Yes', 'No', 'Not Sure'],
                    isRequired: true,
                    name: 'paidRestitutionAndFees',
                    title:
                        'Have you paid all restitution, fines, court costs, late fees or other fees ordered by the Court in your case?',
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
