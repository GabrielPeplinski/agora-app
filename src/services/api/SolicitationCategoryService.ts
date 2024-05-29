import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import SolicitationCategoryInterface from '@/src/interfaces/SolicitationCategoryInterface';

export const getSolicitationCategories = async (): Promise<SolicitationCategoryInterface[] | null> => {
  try {
    const response = await axiosInstance()
      .get(apiRoutes.solicitationCategory.get);

    console.log(response.data.data);

    return response.data.data as SolicitationCategoryInterface[];
  } catch (error: any) {
    console.log(error);
    return null;
  }
};