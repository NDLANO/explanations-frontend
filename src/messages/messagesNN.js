/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const NN = {
    header: {
        title: "Forklaring",
        login: "Logg inn",
        logout: "Logg ut"
    },
    meta: {
        description: "beskriving"
    },
    logo: {
        label: "Nasjonal digital læringsarena"
    },
    subNavigation: {
        search: "Søk",
        create: "Opprett"
    },
    search: {
        title: "Søk etter omgrep",
        input: {
            placeholder: "Skriv inn omgrep",
        },
        subject: {
            placeholder: "Fag",
            title: "Fag"
        },
        language: {
            placeholder: "Språk",
            title: "Språk"
        },
    },
    loginProviders: {
        description: "Logg inn i NDLA med",
        consent_before_link: "Ved å logge på denne tenesta aksepterer eg vilkåra i NDLA sine",
        consent_link: "retningslinjer for personvern",
        consent_after_link: ", og eg samtykker til at NDLA bruker min personlege informasjon."
    },
    dropdown: {
        placeholder: "Vel..."
    },
    conceptPage: {
        loadDataMessage: {
            error: "Fekk ikkje henta data frå sørvar."
        },
        button: {
            chooseConcept: "Koble til fagtekst"
        }
    },
    editConceptPage: {
        title: "Oppdater omgrep",
        confirmModal: {
            delete: {
                title: "Stadfest arkivering",
                action: "Er du sikker på at du vil arkivere omgrepet?"
            }
        },
        button: {
            delete: "Slett omgrep",
            copy: "Kopier omgrep",
            createNewLanguageVariation: "Opprett ny språkvariant",
            submit: "Lagre oppdateringer",
            media: "Legg til media"
        },
        submitMessage: {
            success:  "Omgrepet er oppdatert!",
            error: "Klarte ikkje å sende inn skjemaet",
        },
        deleteMessage: {
            success: "Omgrepet er arkivert!",
            error: "Klarte ikkje å arkivere omgrep",
        }
    },
    createConceptPage: {
        title: "Opprett omgrep",
        submitMessage: {
            success: "omgrep er oppretta!",
            error: "Klarte ikkje å opprette omgrep"
        },
        button: {
            submit: "Lagre nytt omgrep"
        },
    },
    createConceptLanguageVariationPage: {
        title: "Opprett språkvariant",
        submitMessage: {
            success: "Språkvariant er oppretta!",
            error: "Klarte ikkje å opprette språkvariant"
        },
        button: {
            submit: "Lagre ny språkvariant"
        },
    },
    copyConceptPage: {
        title: "Kopier omgrep",
        submitMessage: {
            success: "Omgrepet er oppretta!",
            error: "Klarte ikkje å opprette omgrep",
        },
        button: {
            submit: "Lagre nytt omgrep"
        },
    },
    deleteConcept: {
        title: "Slett (arkiver)"
    },
    pageTitles: {
        "cloneConcept": "Klon - omgrep NDLA",
        "updateConcept": "Oppdater - omgrep NDLA",
        "createConcept": "Opprett - omgrep NDLA",
        "searchForConcept": "Søk - omgrep NDLA",
        "default": "Forklaring - NDLA",
        "login": "Logg inn - NDLA",
        "logout": "Logg ut - NDLA"
    },
    conceptForm: {
        title: "Tittel",
        content: "Innhald",
        addButton: "Legg til ",
        source: "Kjelde",
        externalId: "Ekstern id",
        status: "Status",
        author: "Opphavar til tekst",
        created: "Oppretta",
        updated: "Oppdatert",
        requiredField: "Dette feltet er obligatorisk",
        isLanguageVariation: "Er språkvariant",
        urlToContent: "Link til artikkel",
        button: {
            addMeta: "Legg til ",
        },
        noMedia: "Ingen medium er lagde til"
    },
    confirmModal: {
        default: {
            title: "Stadfest handling",
            action: "Er du sikker på at du vil gjere  dette?",
            button: {
                close: "lukk",
                cancel: "Avbryt",
                confirm: "Stadfest"
            },
        }
    },
    notFound: {
        description: "Fann dessverre ikkje det du leitte etter..."
    },
    loadingMessage: {
        default: 'Lastar ...',
        loadingMeta: 'Lastar inn metadata ...',
        loadingSubjects: 'Lastar inn fag ...',
        loadingLanguages: 'Lastar inn språk ...',
        loadingStatus: 'Lastar inn status ...',
        initializingForm: 'Hentar data ...',
        loadingConfig: 'Hentar konfigurasjonsdata ...',
    },
    forbiddenPage: {
        description: "Her har du ikkje tilgang..."
    },
    searchPage: {
        resultHits: 'treff',
        noResultsFor: 'Ingen treff på',
        resultsFor: "Treff på",
        resultCount:  "Antall omgrep funnet",
        searching: "Søker...",
        title: "Søk etter omgrep",
        tips: "Bruk grunnstammen av ordet for rikt søk",
    },
    indexPage: {
        title: "Heim"
    },
    flashMessage: {
        dismiss: "Lukk"
    },
    searchMedia: {
        audioTitle: "Søk etter lydklipp",
        videoTitle: "Søk etter video",
        imageTitle: "Søk etter bilete",
        searchButtonTitle: "Søk",
        use: "Bruk",
        noResults: "Ingen resultater",
        loadMore: "Last fleire",
        preview: "Førehandsvis",
        publishedDate: "Publisert",
        duration: "Varigheit",
        views: "Visningar"
    },
    phrases: {
        audio: "Lyd",
        video: "Film",
        image: "Bilete",
        preview: "Førehandsvis",
        delete: "Slett",
        language: "Språk",
        subject: "Fag",
        license: "Lisens",
        draft: "Utkast",
        allSubjects: "Alle fag",
        allLanguages: "Alle språk",
        choose: "Vel",
        show: "Vis",
        hide: "Gjem"
    },
    sentence: {
        previewNotSupported: "Støttar ikkje førehandsvising av dette formatet"
    },
    embeddingPage: {
        notVerifiedToken: "Klarte ikkje å validere token",
        tokenIsExpired: "Token er utgått",
        validatingToken: "Validerer token"
    }
};

export default NN;