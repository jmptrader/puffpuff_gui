// used to notify user of any error that happens

export const ERRHANDLER = {
    auth: authErr,
    load: loadErr,
    item: ItemErr
}

/**
 *  authErr(err) notifies user of error during authentication
 */
function authErr(err) { }

/**
 *  loadingErr(err) notifies user of error during content loading
 */
function loadErr(err) { }

/**
 *  ItemErr(err) notifies user of error during items creation
 */
function ItemErr(err) { }