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
      userId:user._id,
      name: user.name,
      email: user.email,
      phone: user.phoneNumber,
      role:  user.role,
    }));
  } catch (error) {
    alert(error?.response?.data?.msg || "Error while viewing users");
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
    alert(error?.response?.data?.msg || "An error occurred while fetching user data");
    return [];
  }
};
    
    export const mockDataManageIssue = async ()=>{
      try {
        const response = await axios.get('/admin/requested-issues',
        {
          headers: {
         'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        });
        let ID = 0
        const { requestedIssues } = response.data;
        return requestedIssues.map(user => ({
          id: ID++,
          userId:user._id,
          ticketNumber: user.ticketNumber,
          name: user.name,
          email: user.email,
          phone: user.phoneNumber,
          serviceType:  user.serviceType,
          issueStatus:user.issueStatus
        }));
      } catch (error) {
        alert(error?.response?.data?.msg || "Error while retrieving issue");
        return [];
      }
    }
    
    // export const mockRecentRequest = [
    //   {
    //     txId: "01e4dsa",
    //     Sholarship: "johndoe",
    //     date: "2021-09-01",
    //     IssuesHandled: "43",
    //   },
    //   {
    //     txId: "0315dsaa",
    //     Sholarship: "jackdower",
    //     date: "2022-04-01",
    //     IssuesHandled: "133",
    //   },
    //   {
    //     txId: "01e4dsa",
    //     Sholarship: "aberdohnny",
    //     date: "2021-09-01",
    //     IssuesHandled: "43",
    //   },
    //   {
    //     txId: "51034szv",
    //     Sholarship: "goodmanave",
    //     date: "2022-11-05",
    //     IssuesHandled: "200",
    //   },
    //   {
    //     txId: "0a123sb",
    //     Sholarship: "stevebower",
    //     date: "2022-11-02",
    //     IssuesHandled: "13",
    //   },
    //   {
    //     txId: "01e4dsa",
    //     Sholarship: "aberdohnny",
    //     date: "2021-09-01",
    //     IssuesHandled: "43",
    //   },
    //   {
    //     txId: "120s51a",
    //     Sholarship: "wootzifer",
    //     date: "2019-04-15",
    //     IssuesHandled: "24",
    //   },
    //   {
    //     txId: "0315dsaa",
    //     Sholarship: "jackdower",
    //     date: "2022-04-01",
    //     IssuesHandled: "133",
    //   },
    // ];
    