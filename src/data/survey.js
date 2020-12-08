const SURVEY_DATA = { "title": "Tell us, what technologies do you use?", "pages": [
        { "name": "page1", "questions": [
                {
                    "type": "radiogroup", "choices": [
                        "Yes",
                        "No"
                    ], "isRequired": true, "name": "skiptoend", "title": "Would you like to skip to the end?"
                },
                { "type": "radiogroup", "choices": [
                        "Yes",
                        "No"
                    ], "isRequired": false, "name": "frameworkUsing","title": "Do you use any front-end framework like Bootstrap?"
                },
                { "type": "checkbox", "choices": [
                        "Bootstrap",
                        "Foundation"
                    ], "hasOther": true, "isRequired": true, "name": "framework", "title": "What front-end framework do you use?", "visibleIf": "{frameworkUsing} = 'Yes'"
                }
            ]
        },
        { "name": "page2", "visibleIf": "{skiptoend} = 'No'", "questions": [
                { "type": "radiogroup", "choices": [
                        "Yes",
                        "No"
                    ],"isRequired": true, "name": "mvvmUsing", "title": "Do you use any MVVM framework?"
                },
                { "type": "checkbox", "choices": [
                        "AngularJS",
                        "KnockoutJS",
                        "React"
                    ], "hasOther": true, "isRequired": true, "name": "mvvm", "title": "What MVVM framework do you use?", "visibleIf": "{mvvmUsing} = 'Yes'"
                }
            ]
        },
        { "name": "page3", "visibleIf": "{skiptoend} = 'No'", "questions": [
                { "type": "comment", "name": "about", "title": "Please tell us about your main requirements for Survey library"
                }
            ]
        }
    ]
};

export default SURVEY_DATA;