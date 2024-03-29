import { firestore } from "../../firebase";
import { Employee } from "@/root/interface/departments";
import { DepartmentType } from "@/root/types/Department.type";
import {
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  addDoc,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const getAll = async () => {
  const departmentsCollection = collection(firestore, "departments");
  const departmentsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    departmentsCollection
  );
  const departments: DocumentData[] = departmentsSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return departments;
};

const getDepartmentsByPage = async (pageSize: number, page: number) => {
  const departmentsCollection = collection(firestore, "departments");
  const limitPage = pageSize * page;
  const departmentsQuery = query(
    departmentsCollection,
    orderBy("name"),
    limit(limitPage),
    startAfter(pageSize * page)
  );
  const departmentsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    departmentsQuery
  );
  const departments: DocumentData[] = departmentsSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return departments;
};
async function create(
  name: string,
  size: number,
  location: string,
  idEmployee: string,
  leader: string,
  level: string,
  subDepartment: string,
  namesubDepartment: string,
  employees: { [key: string]: Employee }
): Promise<{ message: string; departments?: DepartmentType }> {//TODO: Type all variables that you use
  const nameExists = await checkIfNameExists(name);

  if (nameExists) {
    return {
      message: "The department name already exists in another collection",
    };
  }

  const docData = {
    id: "",
    name,
    size,
    location,
    idEmployee,
    leader,
    level,
    subDepartment,
    namesubDepartment,
    employees,
  };

  const newDocRef = await addDoc(collection(firestore, "departments"), docData);

  const docId = newDocRef.id;
  docData.id = docId;

  const updatedDocRef = doc(newDocRef.firestore, `departments/${docId}`);
  await updateDoc(updatedDocRef, { id: docId });

  return {
    message: "Department created successfully",
    departments: docData,
  };
}

async function checkIfNameExists(name: string): Promise<boolean> {
  const querySnapshot = await getDocs(collection(firestore, "departments"));
  const matchingDocs = querySnapshot.docs.filter(
    (doc) => doc.data().name === name
  );
  return matchingDocs.length > 0;
}

const getByDocId = async (docId: string) => {
  const departmentsDocRef = doc(collection(firestore, "departments"), docId);
  const departmentsDocSnapshot = await getDoc(departmentsDocRef);

  if (departmentsDocSnapshot.exists()) {
    return departmentsDocSnapshot.data();
  }
};

const getName = async (name: string) => {
  const departmentsQuery = query(
    collection(firestore, "departments"),
    where("name", "==", name)
  );

  const querySnapshot = await getDocs(departmentsQuery);

  if (!querySnapshot.empty) {
    const departments = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    return departments;
  }
};

const updateById = async (
  id: string,
  name: string,
  size: number,
  location: string,
  idEmployee: string,
  leader: string,
  level: string,
  namesubDepartment: string,
  subDepartment: string,
  employees: Employee
) => {
  const departmentsRef = collection(firestore, "departments");
  const q = query(departmentsRef, where("name", "==", name));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    const departmentsDoc = doc(
      firestore,
      "departments",
      querySnapshot.docs[0].id
    );
    await updateDoc(departmentsDoc, {
      name,
      size,
      location,
      idEmployee,
      leader,
      level,
      namesubDepartment,
      subDepartment,
      employees,
    });
    const snapshotDepartmentUpdate = await getDoc(departmentsDoc);
    const departmentUpdate = snapshotDepartmentUpdate.data();
    return departmentUpdate;
  }
};

const getDepartmentByUidEmployee = async () => {
  const departmentCollection = collection(firestore, "departments");
  const departQuery = query(
    departmentCollection,
    where("idEmployee", "==", ""),
    where("boss", "==", "")
  );
  const departSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    departQuery
  );

  const departs: any[] = [];//TODO: Type all variables that you use

  if (!departSnapshot.empty) {
    departSnapshot.forEach((doc) => {
      departs.push(doc.data());
    });
  }

  return departs;
};

export const departmentProvider = {
  getAll,
  getByDocId,
  create,
  updateById,
  getDepartmentByUidEmployee,
  getDepartmentsByPage,
  getName,
  checkIfNameExists,
};

export default departmentProvider;
