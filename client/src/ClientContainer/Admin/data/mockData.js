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
    alert(error?.response?.data?.msg + "Error while viewing users");
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
    alert(error?.response?.data?.msg + "An error occurred while fetching user data");
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
        alert(error?.response?.data?.msg + "Error while retrieving issue");
        return [];
      }
    }
    