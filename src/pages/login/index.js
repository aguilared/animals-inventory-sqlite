import axios from "axios";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const { isUser, loadUser } = useUser(); //to Global

  if (isUser) {
    toast.error(" You Are Being Redirected");
    setTimeout(function () {
      router.push("/animals/admin");
    }, 5000);
  }

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login1", credentials);
    console.log("RES", res);

    if (res.status === 200) {
      if (!isUser) {
        console.log("no hay Users va a cargar a global", res);
        loadUser(credentials); //load idto global
      }
      console.log("Routeando a animals admin");

      router.push("/animals/admin");
    }
    if (res.status === 401) {
      console.log("Res Status 401 a /");

      router.push("/");
    }
  };

  const handleClose = useCallback(() => {
    console.log("isUser", isUser);
  }, [isUser]);

  const title = "Login";

  return (
    <div
      className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
    >
      <div
        className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto"
      >
        {/*content*/}
        <div
          className="
            translate
            duration-300
            h-full
            translate-y-0
            opacity-100"
        >
          <div
            className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none"
          >
            {/*header*/}
            <div
              className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative"
            >
              <button
                className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9"
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="flex flex-col gap-4">
                <div className="w-full relative">
                  <form
                    className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
                    onSubmit={handleSubmit}
                  >
                    <div className="w-full px-3 mb-6 md:mb-0">
                      <hr />

                      <div className="w-full relative">
                        <input
                          className="w-full rounded py-2 px-4 p-4 pt-6"
                          type="email"
                          placeholder="Email"
                          onChange={(e) =>
                            setCredentials({
                              ...credentials,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <hr />

                      <div className="w-full relative">
                        <input
                          className=" w-full rounded py-2 px-4 p-4 pt-6 "
                          type="password"
                          placeholder="Password"
                          onChange={(e) =>
                            setCredentials({
                              ...credentials,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-3">
                      <hr />

                      <button className="btn btn-secondary items-center bg-rose-500">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
