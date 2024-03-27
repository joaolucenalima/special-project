import { buildServer } from "@/utils/buildServer";
import { FastifyInstance, HTTPMethods } from "fastify";
import { deepEqual } from "node:assert";
import { after, before, describe, it } from "node:test";

interface HttpOptions {
  method: HTTPMethods
  headers: { [key: string]: string }
  body?: string
}

async function makeRequest(url: string, opts: HttpOptions) {
  const response = await fetch(url, {
    method: opts.method,
    headers: opts.headers,
    body: opts.body
  })
  const data = await response.json()
  return { status: response.status, data }
}

describe("api test suite", () => {
  let server: FastifyInstance
  before(async () => {
    server = buildServer()
    await server.listen({ port: 3333 })
  })

  after(() => {
    server.close()
  })

  it("server is running", async () => {
    const response = await makeRequest("http://localhost:3333", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    deepEqual(response.data, { message: "Hello World" })
  })

  it("POST /task", async () => {
    const fakeTask = {
      title: "Task 1",
      user_id: "c5be5b1f-4195-4416-8c2e-7eee15477e89", // random uuid
      theme: "Work",
      status: false,
    }

    const { status } = await makeRequest("http://localhost:3333/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 02d0e990-65aa-45c8-adc1-9ef60b91022c`
      },
      body: JSON.stringify(fakeTask)
    })
    deepEqual(status, 401)
  })
})