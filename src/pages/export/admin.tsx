import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import { useState } from "react";
import AddScreen from "../../components/AddScreen";
import DisplayScreen from "../../components/DisplayScreen";
import data from "../../components/data/Clases.json";
import dataAnimals from "../../components/data/Animal.json";

const prisma = new PrismaClient();

export const getServerSideProps = async () => {
  const contacts = await prisma.contact.findMany();
  return {
    props: {
      initialContacts: contacts,
    },
  };
};

const exportJson = async (data: any) => {
  console.log("DATA", data);
  const exportJson3 = await Promise.all(
    data.map(async (data: any) => {
      console.log("DATA1", data);
      const response = await fetch("/api/clases/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=utf8",
        },
      });
      console.log("response", response);
    })
  );
};

const exportJsonAnimals = async (data: any) => {
  console.log("DATAAni", data);
  const exportJson3 = await Promise.all(
    data.map(async (data: any) => {
      console.log("DATA1", data);
      const response = await fetch("/api/animals/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=utf8",
        },
      });
      console.log("responseCu", response);
    })
  );
  console.log("responseSalio", exportJson3);
};

const saveContact = async (contact: any) => {
  const response = await fetch("/api/contacts", {
    method: "POST",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json; charset=utf8",
    },
  });

  // console.log("response", contact);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const delContact = async (contact: any) => {
  if (window.confirm("Do you want to delete this food?")) {
    await fetch("/api/deleteContact", {
      method: "POST",
      body: JSON.stringify({
        id: contact.id,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
    });
    // console.log("response", contact)
  }
};
type ContactListProps = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

type Contactss = {
  initialContacts: ContactListProps[];
};

export default function Home({ initialContacts }: Contactss) {
  console.log("Contaactsssss", initialContacts);
  const [contacts, setContacts] = useState(initialContacts);

  return (
    <div className="">
      <Head>
        <title>Contact App</title>
        <meta name="description" content="Created by Connelblaze" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid md:grid-cols-3">
        <AddScreen
          contacts={initialContacts}
          AddContactFormProps={async (data: any, e: any) => {
            try {
              await saveContact(data);
              setContacts([...contacts, data]);
              e.target.reset();
            } catch (error) {
              console.log(error);
            }
          }}
        />

        <DisplayScreen contacts={initialContacts} delContact={delContact} />
      
      </div>
    </div>
  );
}
