import axios from 'axios';

export const mockDataTeam = async () => {
  try {
    const response = await axios.get('/admin/users',
    {
      headers: {
     'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
    let Id = 1;
    const { users } = response.data;
    return users.map(user => ({
      id: Id++,
      name: user.name,
      email: user.email,
      phone: user.phoneNumber,
      role: user.role,
    }));
  } catch (error) {
    console.log('Error fetching user data:', error);
    return [];
  }
};
export const mockDataContacts = async () => {
  try {
    const response = await axios.get('/admin/users',
    {
      headers: {
     'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
    let Id = 1;
    const { users } = response.data;
    return users.map(user => ({
      id: Id++,
      name: user.name,
      email: user.email,
      phone: user.phoneNumber,
      registrarId: user._id,
    }));
  } catch (error) {
    console.log('Error fetching user data:', error);
    return [];
  }
};
    
    export const mockDataStaffSummary = [
      {
        id: 1,
        name: "Tola Lemma",
        email: "tolalemma@gmail.com",
        IssuesHandled: "21",
        phone: "(251)245973674",
        date: "03/12/2023-10/12/2023",
      },
      {
        id: 2,
        name: "Cersei Lannister",
        email: "cerseilannister@gmail.com",
        IssuesHandled: "1",
        phone: "(421)314-2288",
        date: "06/15/2021-03/11/2023",
      },
      {
        id: 3,
        name: "Jaime Lannister",
        email: "jaimelannister@gmail.com",
        IssuesHandled: "11",
        phone: "(422)982-6739",
        date: "05/02/2022-03/09/2023",
      },
      {
        id: 4,
        name: "Anya Stark",
        email: "anyastark@gmail.com",
        IssuesHandled: "80",
        phone: "(921)425-6742",
        date: "01/02/2023-03/12/2023",
      },
      {
        id: 5,
        name: "Daenerys Targaryen",
        email: "daenerystargaryen@gmail.com",
        IssuesHandled: "1",
        phone: "(421)445-1189",
        date: "01/12/2021-03/12/2023",
      },
      {
        id: 6,
        name: "Ever Melisandre",
        email: "evermelisandre@gmail.com",
        IssuesHandled: "63",
        phone: "(232)545-6483",
        date: "11/02/2022-03/01/2023",
      },
      {
        id: 7,
        name: "Ferrara Clifford",
        email: "ferraraclifford@gmail.com",
        IssuesHandled: "52",
        phone: "(543)124-0123",
        date: "02/11/2022-03/03/2023",
      },
      {
        id: 8,
        name: "Rossini Frances",
        email: "rossinifrances@gmail.com",
        IssuesHandled: "21",
        phone: "(222)444-5555",
        date: "05/02/2021-03/02/2023",
      },
    ];
    
    export const mockRecentRequest = [
      {
        txId: "01e4dsa",
        Sholarship: "johndoe",
        date: "2021-09-01",
        IssuesHandled: "43",
      },
      {
        txId: "0315dsaa",
        Sholarship: "jackdower",
        date: "2022-04-01",
        IssuesHandled: "133",
      },
      {
        txId: "01e4dsa",
        Sholarship: "aberdohnny",
        date: "2021-09-01",
        IssuesHandled: "43",
      },
      {
        txId: "51034szv",
        Sholarship: "goodmanave",
        date: "2022-11-05",
        IssuesHandled: "200",
      },
      {
        txId: "0a123sb",
        Sholarship: "stevebower",
        date: "2022-11-02",
        IssuesHandled: "13",
      },
      {
        txId: "01e4dsa",
        Sholarship: "aberdohnny",
        date: "2021-09-01",
        IssuesHandled: "43",
      },
      {
        txId: "120s51a",
        Sholarship: "wootzifer",
        date: "2019-04-15",
        IssuesHandled: "24",
      },
      {
        txId: "0315dsaa",
        Sholarship: "jackdower",
        date: "2022-04-01",
        IssuesHandled: "133",
      },
    ];
    