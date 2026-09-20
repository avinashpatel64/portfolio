const STORAGE_KEY = 'csi-case-study-unlocked'
export const CSI_PASSWORD = 'avinashpatel'

export function isCaseStudyUnlocked() {
  return sessionStorage.getItem(STORAGE_KEY) === 'true'
}

export function unlockCaseStudy() {
  sessionStorage.setItem(STORAGE_KEY, 'true')
}
