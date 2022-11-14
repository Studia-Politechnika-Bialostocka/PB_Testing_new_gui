import PySimpleGUI as sg

INFORMATION_ABOUT_UNIQUENESS = 'To have your save buttons enabled, you need to have xpath of your element unique :D'

input_width = 20
number_items_to_show = 4


def get_layout(domain,
               login_path,
               last_site,
               username_field,
               username_value,
               password_field,
               password_value,
               actions,
               bdd_attributes,
               GIVEN_ATTRIBUTE_INFO,
               todo_actions_in_array
               ):
    layout = [
        [
            [
                sg.Column([[]], k='layout_principal', expand_x=True),
                sg.Text("Plan name", expand_x=True)
            ],
            [
                sg.Column([[]], k='layout_principal', expand_x=True),
                sg.Input("Something", key='-TITLE-OF-TEST-'),
                sg.Column([[]], k='layout_principal', expand_x=True),
            ],
            [
                sg.HorizontalSeparator()
            ],
            sg.Column(
                [
                    [
                        sg.Text("Main domain")
                    ],
                    [
                        sg.Input(domain, key='-DOMAIN-', size=(20, 20))
                    ],
                    [
                        sg.Text("Url for logging in")
                    ],
                    [
                        sg.Input(login_path, key='-LOGIN-PATH-', size=(20, 20), disabled=True,
                                 disabled_readonly_background_color='red', enable_events=True)
                    ],
                    [
                        sg.Col(
                            [
                                [
                                    sg.Listbox(values=[], size=(input_width, number_items_to_show),
                                               enable_events=True,
                                               key='-LOGIN-PATH-BOX-', select_mode=sg.LISTBOX_SELECT_MODE_SINGLE,
                                               no_scrollbar=True, background_color='#13445a')
                                ]
                            ], key='-LOGIN-PATH-BOX-CONTAINER-', pad=(0, 0), visible=True
                        )
                    ],
                    [
                        sg.Text("Site for scraping")
                    ],
                    [
                        sg.Input(last_site, key='-LAST-SITE-', size=(20, 20), enable_events=True)
                    ],
                    [
                        sg.Col(
                            [
                                [
                                    sg.Listbox(values=[], size=(input_width, number_items_to_show),
                                               enable_events=True,
                                               key='-LAST-SITE-BOX-', select_mode=sg.LISTBOX_SELECT_MODE_SINGLE,
                                               no_scrollbar=True, background_color='#13445a')
                                ]
                            ], key='-LAST-SITE-BOX-CONTAINER-', pad=(0, 0), visible=True
                        )
                    ]
                ]
            ),
            sg.Column(
                [
                    [
                        sg.Text("Username input name for logging in")
                    ],
                    [
                        sg.Input(username_field, key='-USERNAME-FIELD-', disabled=True,
                                 disabled_readonly_background_color='red')
                    ],
                    [
                        sg.Text("Username value for logging in")
                    ],
                    [
                        sg.Input(username_value, key='-USERNAME-VALUE-', disabled=True,
                                 disabled_readonly_background_color='red')
                    ]
                ]
            ),
            sg.Column(
                [
                    [
                        sg.Text("Password input name for logging in")
                    ],
                    [
                        sg.Input(password_field, key='-PASSWORD-FIELD-', disabled=True,
                                 disabled_readonly_background_color='red')
                    ],
                    [
                        sg.Text("Password value for logging in")
                    ],
                    [
                        sg.Input(password_value, key='-PASSWORD-VALUE-', disabled=True,
                                 disabled_readonly_background_color='red')
                    ]
                ]
            ),
            sg.Column([
                [
                    sg.Button("Save your changes", key='-SAVE-CHANGES-TO-CONFIG-'),
                ],
                [
                    sg.FileSaveAs("Save configuration", key='-SAVE-CONFIGURATION-', enable_events=True,
                                  file_types=[((("PB_CONFIG"), ("*.pb_config")))])
                ],
                [
                    sg.FileBrowse("Load configuration", key='-LOAD-CONFIGURATION-', enable_events=True,
                                  file_types=[((("PB_CONFIG"), ("*.pb_config")))])
                ]
            ])
        ],
        [
            sg.Column([[]], k='layout_principal', expand_x=True),
            sg.Checkbox('Logged in', default=False, expand_x=True, enable_events=True, k='-LOGGED-IN-')
        ],
        [
            sg.HorizontalSeparator()
        ],
        [
            [
                sg.Column([
                    [
                        sg.Text("Available actions for your plan"),
                        sg.Combo(actions, default_value=actions[0], key='-ACTIONS-CHOICE-', readonly=True,
                                 enable_events=True),
                        sg.Combo(bdd_attributes, default_value=bdd_attributes[0], key='-BDD-ATTRIBUTE-', readonly=True,
                                 enable_events=True),
                        sg.Text(GIVEN_ATTRIBUTE_INFO, key='-BDD-ATTRIBUTE-INFO-', enable_events=True)
                    ],
                    [
                        sg.Listbox([], size=(40, 20), k='-TAG-LIST-', enable_events=True)
                    ]
                ]),
                sg.Column([
                    [
                        sg.Text("Tag description:")
                    ],
                    [
                        sg.Multiline("", disabled=True, size=(40, 15), background_color='#faea5a',
                                     key='-TAG-DESCRIPTION-')
                    ],
                    [
                        sg.Text("")
                    ]
                ]),
                sg.Column([
                    [
                        sg.Text("Xpath of element:", key='-XPATH-INFO-')
                    ],
                    [
                        sg.Multiline("", key='-XPATH-INPUT-', size=(40, 15)),
                        sg.Column(
                            [
                                [
                                    sg.Button('Show whole html in external app', button_color='orange',
                                              key='-SHOW-HTML-')
                                ],
                                [
                                    sg.Button('Copy whole html', button_color='black', key='-COPY-HTML-')
                                ],
                                [
                                    sg.Button('Check if xpath exists in html', button_color='blue',
                                              key='-XPATH-EXISTS-')
                                ],
                                [
                                    sg.Button('Save xpath', button_color='red', key='-XPATH-SAVE-')
                                ]
                            ]
                        )
                    ],
                    [
                        sg.Text("", key='-XPATH-ELEMENTS-')
                    ]
                ])
            ],
            [
                sg.Button("Add new action", k='-ADD-ACTION-', tooltip=INFORMATION_ABOUT_UNIQUENESS),
                sg.Button("Save action", k='-SAVE-ACTION-', tooltip=INFORMATION_ABOUT_UNIQUENESS),
                sg.Button("Delete selected action", k='-DELETE-ACTION-', button_color='red'),
                sg.Column([[]], expand_x=True),
                sg.Column([
                    [
                        sg.Text("Write here your info for input", key='-HELPER-INPUT-LABEL-')
                    ],
                    [
                        sg.Input("Additional", key='-HELPER-INPUT-')
                    ]
                ], expand_x=True)
            ],
            [
              sg.HorizontalSeparator()
            ],
            [
                sg.Column([[]], k='layout_principal', expand_x=True),
                sg.Text("Plan of actions", expand_x=True)
            ],
            [
                sg.Column([[]], k='layout_principal', expand_x=True),
                sg.Listbox(todo_actions_in_array, size=(20, 20), k='-ACTION-LIST-', expand_x=True, enable_events=True),
                sg.Column([[]], k='layout_principal'),
                sg.Column([
                    [
                        sg.Button("\u25B2", key='-MOVE-UP-'),
                    ],
                    [
                        sg.Button("\u25BC", key='-MOVE-DOWN-'),
                    ]
                ], expand_x=True)
            ],
            [
                sg.Column([[]], k='layout_principal', expand_x=True),
                [
                    sg.Column([[]], expand_x=True),
                    sg.Button("Generate plan", k='-GENERATE-PLAN-', button_color='purple')
                ]
            ]
        ]
    ]
    return layout