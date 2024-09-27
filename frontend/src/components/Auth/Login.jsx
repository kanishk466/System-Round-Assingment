import React, { useState } from "react";
import { login } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await login(email, password);
    setToken(token);
    navigate("/categories");
  };

  return (
    <>
      <section class="bg-light py-3 py-md-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div class="card border border-light-subtle rounded-3 shadow-sm">
                <div class="card-body p-3 p-md-4 p-xl-5">
                  <div class="text-center mb-3"></div>
                  <h2 class="fs-6 fw-normal text-center text-secondary mb-4">
                    Sign in to your account
                  </h2>
                  <form onSubmit={handleLogin}>
                    <div class="row gy-2 overflow-hidden">
                      <div class="col-12">
                        <div class="form-floating mb-3">
                          <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            required
                          />
                          <label for="email" class="form-label">
                            Email
                          </label>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating mb-3">
                          <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            required
                          />
                          <label for="password" class="form-label">
                            Password
                          </label>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="d-grid my-3">
                          <button class="btn btn-primary btn-lg" type="submit">
                            Log in
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
