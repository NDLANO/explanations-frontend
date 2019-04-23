/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const NB = {
    header: {
        title: "Term",
        login: "Login",
        logout: "Logout"
    },
    meta: {
        description: "description"
    },
    logo: {
        label: "Nasjonal digital læringsarena \"Norwegian National Digital Learning Arena\""
    },
    subNavigation: {
        search: "Søk",
        create: "Opprett"
    },
    search: {
        title: "Search for term",
        input: {
            placeholder: "Enter the term"
        },
        subject: {
            placeholder: "Subject",
            title: "Subject",
        },
        language: {
            placeholder: "Language",
            title: "Language",
        }
    },
    loginProviders: {
        description: "Login to NDLA with ",
        consent_before_link: "By signing in to this service I accept the terms and conditions of NDLA’s",
        consent_link: "privacy policy",
        consent_after_link: "and I consent to NDLA using my personal information."
    },
    dropdown: {
        placeholder: "Select"
    },
    conceptPage: {
        loadDataMessage: {
            error: "Failed to retrieve data from server"
        },
        button: {
            chooseConcept: "Connect to text"
        }
    },
    editConceptPage: {
        title: "Update term",
       confirmModal: {
           delete: {
               title: "Confirm archiving",
               action: "Are you sure you want to archive the term?"
           },
       },
       button: {
           delete: "Delete term",
           copy: "Copy term",
           createNewLanguageVariation: "Create new language variant",
           submit: "Save changes",
           media: "Add media"
       },
       submitMessage: {
           success: "The term is updated!",
           error: "Failed to submit form"
       },
       deleteMessage: {
           success: "The term is archived!",
           error: "Failed to archive term"
       }
   },
    createConceptPage: {
        title: "Create term",
        submitMessage: {
           success: "The term is created!",
           error: "Failed to create term",
       },
        button: {
            submit: "Save new term"
        },
    },
    createConceptLanguageVariationPage: {
        title: "Create language variant",
       submitMessage: {
           success: "Language variant is created!",
           error: "Failed to create language variant"
       },
        button: {
            submit: "Save new language variant"
        },
    },
    copyConceptPage: {
        title: "Copy term",
       submitMessage: {
           success: "The term is created!",
           error: "Failed to create term"
       },
        button: {
            submit: "Save new term"
        },
    },
        deleteConcept: {
            title: "Delete (archive)",
        },
        pageTitles: {
            "cloneConcept": "Clone – term NDLA",
            "updateConcept": "Update – term NDLA",
            "createConcept": "Create – term NDLA",
            "searchForConcept": "Search – term NDLA",
            "default": "Term glossary – NDLA",
            "login": "Login – NDLA",
            "logout": "Logout – NDLA",
            },
        conceptForm: {
            title: "Title",
            content: "Content",
            add: "Add ",
            source: "Source",
            externalId: "External id",
            status: "Status",
            author: "Opphaver til tekst",
            created: "Created",
            updated: "Updated",
            requiredField: "This field is required",
            isLanguageVariation: "Is språkvariant",
            urlToContent: "Link to article",
            button: {
                addMeta: "Add media",
            },
            noMedia: "No media present"
    },
    confirmModal: {
    default: {
            title: "confirm action",
               action: "Are you sure you want to do this",
               button: {
                   close: "close",
                   cancel: "Cancel",
                   confirm: "Confirm"
               },
        }
    },
    notFound: {
        description: "We could not find what you were looking for"
    },
    loadingMessage: {
        default: "Loading",
        loadingMeta:"Loading metadata",
        loadingSubjects:  "Loading subject",
        loadingLanguages: "Loading language",
            loadingStatus:  "loading status",
           initializingForm: "Retrieving data",
           loadingConfig: "Retrieving configuration data",
    },
    forbiddenPage: {
        description:  "you do not have access here"
    },
    searchPage: {
        resultHits: "results",
       notResultsWith: "No results found for",
        resultsFor: "Results for",
        resultCount:  "Number of terms found",
        searching: "Searching...",
        title: "Search for term",
        tips: "Use root form of word to widen search",
    },
    indexPage: {
        title: "Home"
    },
    flashMessage: {
        dismiss: "Close"
    },
    searchMedia: {
        audioTitle: "Search for audio clips",
        videoTitle: "Search for video",
        imageTitle:  "Search for images",
        searchButtonTitle: "Search",
       use: "Use",
       noResults: "No results",
       loadMore: "Load more",
       preview: "Preview",
       publishedDate: "Published",
       duration: "Duration",
       views: "Views",
    },
    phrases: {
        audio: "Audio",
        video: "Video",
        image: "Image",
        preview: "Preview",
        delete: "Delete",
        language: "Language",
        subject: "Subject",
        license: "License",
        draft: "Draft",
        allSubjects: "All subjects",
        allLanguages:  "All languages",
        choose: "select",
        show: "Show",
        hide: "Hide"
    },
    sentence: {
        previewNotSupported: "Preview is not supported for this file type"
    },
    embeddingPage: {
        notVerifiedToken: "Failed to validate the token",
       tokenIsExpired:  "Token is expired",
        validatingToken: "Validating token"
    }
};

export default NB;