/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


const NB = {
    header: {
        title: "Forklaringstjeneste",
        login: "Logg inn",
        logout: "Logg ut"
    },
    meta: {
        description: "description"
    },
    logo: {
        label: "Nasjonal digital læringsarena"
    },
    subNavigation: {
        search: "Søk",
        create: "Opprett"
    },
    search: {
        title: "Søk etter begrep",
        input: {
            placeholder: "Skriv inn begrep tittel",
        },
        subject: {
            placeholder: "Fag",
            title: "Fag"
        },
        language: {
            placeholder: "Språk",
            title: "Språk"
        }
    },
    loginProviders: {
        description: "Logg inn i NDLA med",
        consent_before_link: "Ved å logge på denne tjenesten aksepterer jeg herved vilkårene i NDLAs",
        consent_link: "personvernpolicy",
        consent_after_link: ", og jeg gir mitt samtykke til at NDLA bruker min personlige informasjon."
    },
    
    dropdown: {
        placeholder: "Velg..."
    },

    updateConcept: {
        title: "Oppdater begrep",
        confirmModal: {
            clone: {
                title: "Bekreft kloning",
                action: "Er du sikker på at du vil klone begrepet?"
            },
            delete: {
                title: "Bekreft sletting",
                action: "Er du sikker på at du vil slette begrepet?"
            }
        },
        button: {
            delete: "Slett begrep",
            clone: "Klon begrep"
        },
        submitMessage: {
            success: {
                title: "Begrepet er oppdatert!"
            },
            error: {
                title: "Klarte ikke å sende inn skjemaet",
            }
        },
        deleteMessage: {
            success: {
                title: "Begrepet er arkivert!"
            },
            error: {
                title: "Klarte ikke å slette begrep",
            }
        },
        loadDataMessage: {
           error: {
               title: "Fikk ikke hentet data fra server."
           }
        }
    },
    createConcept: {
        title: "Opprett begrep",
        submitMessage: {
            success: {
                title: "Begrepet er opprettet!"
            },
            error: {
                title: "Klarte ikke å opprette begrep"
            }
        }
    },
    cloneConcept: {
        submitMessage: {
            success: {
                title: "Begrepet er klonet og opprettet!"
            },
            error: {
                title: "Klarte ikke å clone og opprette begrep",
            }
        },
    },
    deleteConcept: {
        title: "Slett (arkiver)"
    },
    pageTitles: {
        "cloneConcept": "Klon - begrep NDLA",
        "updateConcept": "Oppdater - begrep NDLA",
        "createConcept": "Opprett - begrep NDLA",
        "searchForConcept": "Søk - begrep NDLA",
        "default": "Begrepstjeneste - NDLA",
        "login": "Logg inn - NDLA",
        "logout": "Logg ut - NDLA"
    },

    conceptForm: {
        title: "Tittel",
        content: "Innhold",
        addButton: "Legg til ",
        source: "Kilde",
        externalId: "Ekstern id",
        status: "Status",
        author: "Opphaver til tekst",
        created: "Opprettet",
        updated: "Oppdatert",
        requiredField: "Dette feltet er obligatorisk",
        button: {
            addMeta: "Legg til "
        }
    },
    confirmModal: {
        default: {
            title: "Bekreft handling",
            action: "Er du sikker på at du vil gjøre dette?",
            button: {
                close: "lukk",
                cancel: "Avbryt",
                confirm: "Bekreft"
            },
        }
    },
    notFound: {
        description: "Fant dessverre ikke det du letet etter..."
    },
    loadingMessage: {
        default: 'Laster ...',
        loadingMeta: 'Laster inn metadata ...',
        loadingSubjects: 'Laster inn fag ...',
        loadingLanguages: 'Laster inn språk ...',
        loadingStatus: 'Laster inn status ...',
        initializingForm: 'Henter data ...',
        loadingConfig: 'Henter konfigurasjonsdata ...',
    },
    forbiddenPage: {
        description: "Her har du ikke tilgang..."
    }
};

export default NB;