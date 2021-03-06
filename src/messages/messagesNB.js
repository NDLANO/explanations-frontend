/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const NB = {
    header: {
        title: "Forklaring",
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
        title: "Søk etter forklaring",
        input: {
            placeholder: "Skriv inn forklaring tittel",
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
        consent_before_link: "Ved å logge på denne tjenesten aksepterer jeg herved vilkårene i NDLAs",
        consent_link: "personvernpolicy",
        consent_after_link: ", og jeg gir mitt samtykke til at NDLA bruker min personlige informasjon."
    },
    dropdown: {
        placeholder: "Velg..."
    },
    conceptPage: {
        loadDataMessage: {
            error: "Fikk ikke hentet data fra server."
        },
        button: {
            chooseConcept: "Koble til fagtekst"
        }
    },
    editConceptPage: {
        title: "Oppdater forklaring",
        confirmModal: {
            delete: {
                title: "Bekreft arkivering",
                action: "Er du sikker på at du vil arkivere forklaringen?"
            }
        },
        button: {
            delete: "Slett forklaring",
            copy: "Kopier forklaring",
            createNewLanguageVariation: "Opprett ny språkvariant",
            submit: "Lagre oppdateringer",
            media: "Legg til media"
        },
        submitMessage: {
            success:  "Forklaringen er oppdatert!",
            error: "Klarte ikke å sende inn skjemaet",
        },
        deleteMessage: {
            success: "Forklaringen er arkivert!",
            error: "Klarte ikke å arkivere forklaring",
        }
    },
    createConceptPage: {
        title: "Opprett forklaring",
        submitMessage: {
            success: "Forklaringen er opprettet!",
            error: "Klarte ikke å opprette forklaring"
        },
        button: {
            submit: "Lagre ny forklaring"
        },
    },
    createConceptLanguageVariationPage: {
        title: "Opprett språkvariant",
        submitMessage: {
            success: "Språkvariant er opprettet!",
            error: "Klarte ikke å opprette språkvariant"
        },
        button: {
            submit: "Lagre ny språkvariant"
        },
    },
    copyConceptPage: {
        title: "Kopier forklaring",
        submitMessage: {
            success: "Forklaringen er opprettet!",
            error: "Klarte ikke å opprette forklaring",
        },
        button: {
            submit: "Lagre ny forklaring"
        },
    },
    deleteConcept: {
        title: "Slett (arkiver)"
    },
    pageTitles: {
        "cloneConcept": "Klon - forklaring NDLA",
        "updateConcept": "Oppdater - forklaring NDLA",
        "createConcept": "Opprett - forklaring NDLA",
        "searchForConcept": "Søk - forklaring NDLA",
        "default": "Forklaring - NDLA",
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
        isLanguageVariation: "Er språkvariant",
        urlToContent: "Link til artikkel",
        button: {
            addMeta: "Legg til media",
        },
        noMedia: "Ingen medier er lagt til"
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
    },
    searchPage: {
        resultHits: 'treff',
        noResultsFor: 'Ingen treff på',
        resultsFor: "Treff på",
        resultCount:  "Antall forklaring funnet",
        searching: "Søker...",
        title: "Søk etter forklaring",
        tips: "Bruk grunnstammen av ordet for rikt søk",
    },
    indexPage: {
        title: "Hjem"
    },
    flashMessage: {
        dismiss: "Lukk"
    },
    searchMedia: {
        audioTitle: "Søk etter lydklipp",
        videoTitle: "Søk etter video",
        imageTitle: "Søk etter bilder",
        searchButtonTitle: "Søk",
        use: "Bruk",
        noResults: "Ingen resultater",
        loadMore: "Last flere",
        preview: "Forhåndsvis",
        publishedDate: "Publisert",
        duration: "Varighet",
        views: "Visninger"
    },
    phrases: {
        audio: "Lyd",
        video: "Film",
        image: "Bilde",
        preview: "Forhåndsvis",
        delete: "Slett",
        language: "Språk",
        subject: "Fag",
        license: "Lisens",
        draft: "Utkast",
        allSubjects: "Alle fag",
        allLanguages: "Alle språk",
        choose: "Velg",
        show: "Vis",
        hide: "Gjem"
    },
    sentence: {
        previewNotSupported: "Støtter ikke fohåndsvisining av dette formatet"
    },
    embeddingPage: {
        notVerifiedToken: "Klarte ikke å validere token",
        tokenIsExpired: "Token er utgått",
        validatingToken: "Validerer token"
    }
};

export default NB;