
import { NextRequest, NextResponse } from "next/server";
import { exec, spawn } from "child_process";
import { promisify } from "util";

interface Payload {
  question: string
  payload: string;
}

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {

  let stdout = '';
  let stderr = '';

  try {

    const payload = await request.json() as Partial<Payload>;

    if (!payload.question) {
      return NextResponse.json(
        { error: "Specify the question." },
        { status: 400 }
      );
    }

    if (!payload.payload) {
      return NextResponse.json(
        { error: "You need a payload." },
        { status: 400 }
      );
    }

    const validQuestions = ["out-of-passwords"];
    if (!validQuestions.includes(payload.question)) {
      return NextResponse.json(
        { error: `Invalid question. Must be one of: ${validQuestions}` },
        { status: 400 }
      );
    }

    const childProcess = spawn(`${process.cwd()}/public/crypto/${payload.question}`);

    childProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    childProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });


    childProcess.stdin.write(payload.payload);
    childProcess.stdin.end();

    await new Promise((resolve, reject) => {
      childProcess.on('close', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });
      childProcess.on('error', reject);
    });

    return NextResponse.json(
      { stdout, stderr }
    );

  } catch (error) {

    console.log(error);
    return NextResponse.json(
      { error: String(error), stdout, stderr },
      { status: 500 }
    );
  }
}
