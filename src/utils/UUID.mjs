import {v4 as uuid} from 'uuid';

function UUID() {
    return uuid().replace(/\D/g, ''); // Remove non-numeric characters
}

export default UUID;