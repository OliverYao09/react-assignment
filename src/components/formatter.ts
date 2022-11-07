import type { FamilyChart, FamilyTree } from './types';

const formatItem = (
  source: FamilyTree,
  list: FamilyTree[],
  spouses: string[]
): FamilyChart => {
  const { id, name, children, gender, parents } = source;

  // Get parents by children ids
  const parentObjs = parents?.map((id: string) =>
    list.find((item) => item.id === id)
  );

  // Filter out invalid member ids, for example, 5555 6666
  const father = parentObjs?.find((item) => item?.gender === 'male');
  const mother = parentObjs?.find((item) => item?.gender === 'female');
  const childrenList =
    children?.filter((child: string) =>
      list.find((item) => item.id === child)
    ) || [];

  return {
    id: id,
    data: {
      label: name,
      gender: gender === 'female' ? 'F' : 'M',
    },
    rels: {
      children: childrenList,
      father: father?.id,
      mother: mother?.id,
      spouses: spouses,
    },
    main: parents?.length === 0,
  };
};

/**
 * Get all the spouses
 * @param list
 * @returns
 */
const getSpousesList = (list: FamilyTree[]): string[][] => {
  return list
    .filter((item) => item.parents?.length)
    .map((item) => item.parents) as string[][];
};

/**
 * Get Get Spouses by ids
 * @param id
 * @param spouses
 * @returns
 */
const getSpouseById = (id: string, spouses: string[][]): string[] => {
  const arr: string[] =
    spouses.find((temp: string[]) => temp!.indexOf(id) > -1) || [];

  return arr.filter((item) => item !== id);
};

// Return a list of family members
export function GenerateChartData(list: FamilyTree[]): FamilyChart[] {
  const spouses = getSpousesList(list);

  return list.map((item) => {
    return formatItem(item, list, getSpouseById(item.id, spouses));
  });
}

export default GenerateChartData;
