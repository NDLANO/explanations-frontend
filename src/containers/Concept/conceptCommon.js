/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {SEVERITY} from "../../components/FlashMessage";
import {updateRoute} from "../../utilities/routeHelper";
import ImageApi from "../../services/imageApiService";
import AudioApi from "../../services/audioApiService";
import VideoApi from "../../services/videoApiService";


export const submitFormHandling = (submitFunction, successHandler, errorHandler, updateFlashMessage) => {
    return submitFunction
        .then(data => submitSuccessHandler(data, successHandler, updateFlashMessage))
        .catch(err => submitErrorHandler(err, errorHandler, updateFlashMessage));
};

export const submitSuccessHandler = (data, {titleMessage, actionType, history, id}, updateFlashMessageFunction) => {
    const message = {};
    message['severity'] = SEVERITY.success;
    message['title'] = titleMessage;
    updateFlashMessageFunction(actionType, message);
    history.push(updateRoute(id));
    return data;
};

export const submitErrorHandler = (errors, {titleMessage, actionType}, updateFlashMessageFunction) => {

    const message = {};
    message['severity'] = SEVERITY.error;
    message['title'] = titleMessage;
    if (errors && errors.errorMessage)
        message['message'] = errors.errorMessage;

    updateFlashMessageFunction(actionType, message);

    return errors;
};

export const mapStateToPropsCommon = ({locale, cacheFromServer: {status, meta, mediaTypes},  credentials: {accessToken}}) => {
    return {
        accessToken: accessToken,
        meta,
        mediaTypes,
        locale,
        status: status.map(x => ({value: x.id, label: x.name})),
    }
};


export const getMetasFromApiResult = concept => {
    const meta = {};
    concept.meta.forEach(x => {
        const key = `meta_${x.category.typeGroup.name.toLowerCase()}`;
        const metaObject = {value: x.id, label: x.description};
        if (x.category.canHaveMultiple) {
            if (meta[key])
                meta[key].push(metaObject);
            else
                meta[key] = [metaObject];
        }else
            meta[key] = {value: x.id, label: x.name};
    });
    return meta;
};


export const getMediaFromApies = (media) => media.map(x => {
    switch(x.typeGroup.name.toLowerCase()) {
        case 'image':
            return new ImageApi().getById(x.externalId);
        case 'audio':
            return new AudioApi().getById(x.externalId);
        case 'video':
            return new VideoApi().getById(x.externalId, x.source);
        default:
            return null;
    }
});

export const mapDataFromAPieToMedia = (conceptMedia) => new Promise((resolve, reject) => {
    Promise.all(getMediaFromApies(conceptMedia)).then(x => {
        const media = [];
        x.forEach((m, index) => {
            const mediaType = conceptMedia[index].mediaType.title;
            const mediaObject = {...conceptMedia[index]};
            switch(mediaType.toLowerCase()) {
                case 'image':
                    mediaObject.title = m.title.title;
                    mediaObject.previewUrl = m.imageUrl;
                    mediaObject.altText = m.alttext.alttext;
                    break;
                case 'audio':
                    mediaObject.title = m.title.title;
                    mediaObject.previewUrl = m.audioFile.url;
                    mediaObject.audioType = m.audioFile.mimeType;
                    break;
                case 'video':
                    mediaObject.previewUrl = m;
                    break;
                default:
                    break;
            }
            media.push(mediaObject)
        });

        resolve(media);
    }).catch(err => reject(err));
});


export const loadConcept = (api, id) => new Promise((resolve, reject) =>
    api.getById(id, api.endpoints.concept)
        .then(concept => {
            const meta = getMetasFromApiResult(concept);
            mapDataFromAPieToMedia(concept.media).then(media => {
                resolve({
                    ...concept,
                    ...meta,
                    media
                });
            });
        })
        .catch(err =>  reject(err))
);


export const metaExists = ({meta}) =>  meta.length > 0;
export const statusExists = ({status}) => status.length > 0;

