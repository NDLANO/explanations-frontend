import decode from "jwt-decode";

export const decodeAccessToken = accessToken => {
    try {
        return decode(accessToken);
    } catch (e) {
        return null;
    }
};

export const isTokenExpired = accessToken => {
    const token = decodeAccessToken(accessToken);

    if (!token)
        return true;
    return new Date(token.exp*1000) < new Date();
};

export const getScope = accessToken => {
    const decodedToken = decodeAccessToken(accessToken);
    if (decodedToken !== null && decodedToken.scope) {
        return decodedToken.scope.split(' ');
    }
    return [];
};