/*
  App general helpers
 */

import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';
import SolicitationActionDescriptionEnum from '@/src/enums/SolicitationActionDescriptionEnum';

/**
 * Translates the status of a solicitation from an enum to a user-friendly string.
 *
 * @param {SolicitationStatusEnum} status - The status of the solicitation, represented by the SolicitationStatusEnum.
 *
 * @returns {string} A user-friendly string representing the status of the solicitation.
 * If the status is not recognized, it returns 'Status desconhecido'.
 *
 * @example
 * // Returns 'Em aberto'
 * getTranslatedSolicitationStatus(SolicitationStatusEnum.OPEN);
 *
 * @example
 * // Returns 'Em andamento'
 * getTranslatedSolicitationStatus(SolicitationStatusEnum.IN_PROGRESS);
 *
 * @example
 * // Returns 'Status desconhecido'
 * getTranslatedSolicitationStatus(999); // Assuming 999 is an unrecognized status
 */
export const getTranslatedSolicitationStatus = (status: SolicitationStatusEnum): string => {
  const translations: { [key in SolicitationStatusEnum]: string } = {
    [SolicitationStatusEnum.OPEN]: 'Em aberto',
    [SolicitationStatusEnum.IN_PROGRESS]: 'Em andamento',
    [SolicitationStatusEnum.RESOLVED]: 'Resolvido',
  };

  return translations[status] || 'Status desconhecido';
};

/**
 * Translates the action description status from an enum to a user-friendly string.
 *
 * @param {SolicitationActionDescriptionEnum} action - The action description status, represented by the SolicitationActionDescriptionEnum.
 *
 * @returns {string} A user-friendly string representing the action description status.
 * If the action is not recognized, it returns 'Ação desconhecida'.
 *
 * @example
 * // Returns 'Criação'
 * getTranslatedActionDescription(SolicitationActionDescriptionEnum.CREATED);
 *
 * @example
 * // Returns 'Atualização'
 * getTranslatedActionDescription(SolicitationActionDescriptionEnum.UPDATED);
 *
 * @example
 * // Returns 'Atualização de Status'
 * getTranslatedActionDescription(SolicitationActionDescriptionEnum.STATUS_UPDATED);
 *
 * @example
 * // Returns 'Ação desconhecida'
 * getTranslatedActionDescription(999); // Assuming 999 is an unrecognized action
 */
export const getTranslatedActionDescription = (action: SolicitationActionDescriptionEnum): string => {
  const translations: { [key in SolicitationActionDescriptionEnum]: string } = {
    [SolicitationActionDescriptionEnum.CREATED]: 'Criação',
    [SolicitationActionDescriptionEnum.UPDATED]: 'Atualização',
    [SolicitationActionDescriptionEnum.STATUS_UPDATED]: 'Atualização de Status',
  };

  return translations[action] || 'Ação desconhecida';
};

/**
 * Formats a title string to a maximum of 27 characters.
 *
 * @param {string} title - The title to be formatted.
 *
 * @returns {string} The formatted title.
 *
 * @example
 * // Returns 'This is a long title...'
 * formatTitle('This is a long title that should be cut off');
 *
 * @example
 * // Returns 'This is a short title'
 * formatTitle('This is a short title');
 */
export const formatTitle = (title: string) => {
  return title.length > 27 ? `${title.substring(0, 27)}...` : title;
};
