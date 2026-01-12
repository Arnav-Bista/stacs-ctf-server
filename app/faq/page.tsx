import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Faq() {
  return (
    <Card className="m-20">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Alongside some stuff you should know about this CTF</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Firstly, welcome to the STACS CTF 2026!
        </p>
        <p>
          This year we&apos;ve had more bright minds working together to make problems and to improve this website overall!
        </p>
        <p>
          We&apos;ve also taken your feedback from last year to make this year&apos;s competition more user friendly :)
        </p>
        <Separator className="my-6" />
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="what-is-ctf">
            <AccordionTrigger>What is a CTF?</AccordionTrigger>
            <AccordionContent className="space-y-3">
              <p>
                CTF stands for <strong>Capture The Flag</strong> - a type of cybersecurity competition where participants solve challenges to find hidden &quot;flags&quot; (special strings of text).
              </p>
              <p>
                In this CTF, you&apos;ll encounter various categories of challenges including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Forensics</strong> - Analyzing files and extracting hidden information</li>
                <li><strong>Cryptography</strong> - Breaking encryption and solving mathematical puzzles</li>
                <li><strong>Engineering/Reverse Engineering</strong> - Understanding and exploiting vulnerabilities in programs</li>
                <li><strong>Web Exploitation</strong> - Finding security flaws in web applications</li>
              </ul>
              <p>
                Each challenge has a point value based on its difficulty. Solve challenges to earn points for your team and climb the leaderboard!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="score">
            <AccordionTrigger>How does Scoring Work? <span className="text-red-400">New System!</span></AccordionTrigger>
            <AccordionContent className="space-y-3">
              <p>
                We heard you! We&apos;ve made a new scoring system for the CTF. Each flag has a set amount of <strong>POINTS</strong>.
              </p>
              <p>
                This is allocated based on the difficulty we think the problem is. However, a problem that we find hard might be really easy for you and vice versa.
              </p>
              <p>
                Now for each flag, we keep track of how many teams also captured it. Then the real score for you is going to be given by <strong>POINTS × (100 / num_found)</strong>.
              </p>
              <p>
                This means if you&apos;re the only one that found a flag, you get 100× the base points. But if 100 teams found it, you only get 1× the base points. So harder problems—ones fewer teams solve—are worth way more!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="team-size">
            <AccordionTrigger>What is the team size limit?</AccordionTrigger>
            <AccordionContent>
              <p>
                While there is no hard limit on the team size,
                We recommend teams of 2-4 to keep things balanced. 
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="flag-format">
            <AccordionTrigger>What format are the flags in?</AccordionTrigger>
            <AccordionContent>
              {
                `Flags always start with 'flag_{<some-random-text>}' `
              }
              <i>unless specified otherwise in the problem</i>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hints">
            <AccordionTrigger>Are there hints available?</AccordionTrigger>
            <AccordionContent>
              Yes
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact">
            <AccordionTrigger>How do I get help or report issues?</AccordionTrigger>
            <AccordionContent>
              You can contact anyone from the STACS Dev Team (we&apos;ll stand out). 
              <p>
                If you spot a mistake/issue let us know ASAP!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rest">
            <AccordionTrigger>GET and POST Requests?</AccordionTrigger>
            <AccordionContent>
              <p>
                For some problems (like the buffer overflow questions), 
                it would be very easy to reverse engineer or just look at
                the binary file to snoop out the flag. 
              </p>
              <br />
              <p>
                For this reason, we hid the binary behind a very simple REST API where you can just call on with
                your inputs. Unfortunately, you&apos;ll have to use Postman, curl, get or write a small script up.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="border">
            <AccordionTrigger>Green Borders?</AccordionTrigger>
            <AccordionContent>
              <p>
                If your team has captured a flag, then that problem will have a green border.
              </p>
              <br />
              <p>
                Thank you for the feedback! Keep them coming!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hidden">
            <AccordionTrigger>Hidden Challenges?</AccordionTrigger>
            <AccordionContent className="space-y-3">
              <p>
                We&apos;ve scatted hidden challenges... or have we?
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="secrets">
            <AccordionTrigger>Secrets</AccordionTrigger>
            <AccordionContent className="space-y-3">
              <p>
                Secrets..... (No we&apos;re not just telling you our secrets...)
              </p>
              <div className="hidden">Have you tried inspecting the home page?</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex justify-center mt-6">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
