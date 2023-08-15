import SAVEFILES from './Types';

const saveFiles = res => {
    return {
        type: SAVEFILES,
        value: res
    };
};

export default saveFiles;
