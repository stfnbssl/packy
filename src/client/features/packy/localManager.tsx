import { LocalPackyData } from './types';

export function savePackyData(packyId: string, packyData: LocalPackyData) {
    window.localStorage.setItem('packy_' + packyId, JSON.stringify(packyData));
}

export function getPackyData(packyId: string): LocalPackyData | null {
    const packyData = window.localStorage.getItem('packy_' + packyId);
    return packyData ? JSON.parse(packyData) : null;
}

export function deletePackyData(packyId: string) {
    window.localStorage.removeItem('packy_' + packyId);
}

export function packyCreatedFromTemplate(packyId: string): LocalPackyData {
    const packyData: LocalPackyData = {
        origin: 'template',
        id: packyId,
        owner: undefined,
        repoName: undefined,
        branch: undefined,
        localCreatedAt: Date.now(),
        githubCreatedAt: -1,
        lastCommitAt: -1,
    }
    savePackyData(packyId, packyData);
    return packyData;
}

export function packyCreatedFromGithubClone(owner: string, repoName: string): LocalPackyData {
    const packyId = `${owner}_${repoName}`;
    const packyData: LocalPackyData = {
        origin: 'github',
        id: packyId,
        owner: owner,
        repoName: repoName,
        branch: 'master',
        localCreatedAt: Date.now(),
        githubCreatedAt: -1,
        lastCommitAt: -1,
    }
    savePackyData(packyId, packyData);
    return packyData;
}

export function packyCommited(packyId: string) {
    const packyData: LocalPackyData | null = getPackyData(packyId);
    if (packyData) {
        packyData.lastCommitAt = Date.now();
        savePackyData(packyId, packyData);
    }
}

export function setSelectedPacky(packyId: string) {
    window.localStorage.setItem('selectedPacky', packyId);
}

export function getSelectedPacky(): string | null {
    return window.localStorage.getItem('selectedPacky');
}