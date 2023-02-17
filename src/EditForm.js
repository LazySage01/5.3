import React, { useState } from "react";

const EditForm = ({ editUser, users }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = () => {
    const id = users[users.length - 1].id + 1;
    const newUser = {
      id,
      name: name,
      username: username,
      email: email,
      address: address,
      phone: phone,
      website: website,
      company: company,
    };
    console.log(newUser);
    editUser(newUser, users);
  };

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <h1 className="h1">Add User</h1>
      <input
        required
        type="text"
        placeholder={"name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        required
        type="text"
        placeholder={"username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        required
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder={"address"}
      />
      <input
        required
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={"phone"}
      />
      <input
        type="text"
        value={website}
        required
        onChange={(e) => setWebsite(e.target.value)}
        placeholder={"website"}
      />
      <input
        type="text"
        required
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder={"company"}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditForm;
