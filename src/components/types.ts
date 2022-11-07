/* We need to convert the id from number to string
becasue some of the ids are too large to be represented accurately as integers
e.g: 897543276547654765443576
*/
export interface FamilyTree {
  id: string;
  name: string;
  children?: string[] | null;
  gender: 'female' | 'male';
  parents?: string[] | null;
}

type Gender = 'M' | 'F';

interface Data {
  desc?: string;
  label: string;
  image?: string;
  gender: Gender;
}

// Relationship between members
interface Rels {
  father?: string;
  mother?: string;
  spouses: string[];
  children: string[];
}
/**
 * Data Structure for family-chart library
 */
export interface FamilyChart {
  id: string;
  data: Data;
  rels: Rels;
  main: boolean;
}
