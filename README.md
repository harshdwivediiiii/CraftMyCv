<h1>CraftMyCV - AI Resume Builder</h1>
<img src="https://github.com/harshdwivediiiii/CraftMy-Cv/blob/main/public/dark-logo.png" alt="logo" width="50" height="50" />


<p>Built with</p>
    <p>
        <img src="https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
        <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
        <img src="https://img.shields.io/badge/Drizzle_ORM-00C7B7?style=for-the-badge&logo=databricks&logoColor=white" alt="Drizzle ORM" />
        <img src="https://img.shields.io/badge/Neon_DB-1E90FF?style=for-the-badge&logo=postgresql&logoColor=white" alt="Neon DB" />
        <img src="https://img.shields.io/badge/Gemini_API-FFD700?style=for-the-badge&logo=google&logoColor=black" alt="Gemini API" />
    </p>

  <p>
        CraftMyCV is an AI-powered resume builder designed to help users create professional and tailored resumes effortlessly. Utilizing the Gemini API, Drizzle ORM, Neon Database, Next.js, and Tailwind CSS, this application provides a seamless user experience for job seekers.
    </p>

   <h2>Environment Variables</h2>
    <p>Make sure to set the following environment variables in your <code>.env</code> file:</p>
    <pre>
        <code>
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your_kinde_issuer_url
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

POSTGRES_URL=your_postgres_connection_string

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
        </code>
    </pre>

   <h2>Getting Started</h2>
    <p>This is a <a href="https://nextjs.org">Next.js</a> project bootstrapped with <a href="https://github.com/vercel/next.js/tree/canary/packages/create-next-app">create-next-app</a>.</p>

   <h3>Run the Development Server</h3>
    <p>To start the development server, run:</p>
    <pre>
        <code>
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
        </code>
    </pre>
    <p>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser to see the application in action.</p>

    
  <h3>Editing the Application</h3>
    <p>You can start editing the page by modifying <code>app/page.js</code>. The page auto-updates as you edit the file.</p>

  <h2>Features</h2>
    <ul>
        <li><strong>AI-Powered Resume Generation</strong>: Leverage AI to create tailored resumes.</li>
        <li><strong>User Authentication</strong>: Secure sign-up and sign-in using Clerk.</li>
        <li><strong>Database Integration</strong>: Store user data and resumes using Neon Database with Drizzle ORM.</li>
        <li><strong>Responsive Design</strong>: Built with Tailwind CSS for a modern and responsive UI.</li>
    </ul>

   <h2>Learn More</h2>
    <p>To learn more about the technologies used in this project, check out the following resources:</p>
    <ul>
        <li><a href="https://nextjs.org/docs">Next.js Documentation</a> - Learn about Next.js features and API.</li>
        <li><a href="https://orm.drizzle.team/">Drizzle ORM Documentation</a> - Understand how to use Drizzle ORM.</li>
        <li><a href="https://gemini.com/api">Gemini API Documentation</a> - Explore the capabilities of the Gemini API.</li>
    </ul>

<h2>Contributing</h2>
<p>We welcome contributions from the community! If you'd like to contribute to CraftMyCV, please follow these guidelines:</p>

<h3>How to Contribute</h3>
<ol>
    <li>Fork the repository on GitHub.</li>
    <li>Clone your forked repository to your local machine:</li>
    <pre>
        <code>
git clone https://github.com/harshdwivediiiii/craftmycv.git
        </code>
    </pre>
    <li>Create a new branch for your feature or bug fix:</li>
    <pre>
        <code>
git checkout -b feature/your-feature-name
        </code>
    </pre>
    <li>Make your changes and commit them:</li>
    <pre>
        <code>
git commit -m "Add your commit message here"
        </code>
    </pre>
    <li>Push your changes to your forked repository:</li>
    <pre>
        <code>
git push origin feature/your-feature-name
        </code>
    </pre>
    <li>Open a pull request on the main repository.</li>
</ol>

<p>
    <img src="https://img.shields.io/github/stars/harshdwivediiiii/CraftMy-Cv" alt="Stars" />
    <img src="https://img.shields.io/github/forks/harshdwivediiiii/CraftMy-Cv" alt="Forks" />
    <img src="https://img.shields.io/github/contributors/harshdwivediiiii/CraftMy-Cv" alt="Contributors" />
    <img src="https://img.shields.io/github/issues/harshdwivediiiii/CraftMy-Cv" alt="Open Issues" />
</p>


  <h2>Deploy on Vercel</h2>
    <p>The easiest way to deploy your Next.js app is to use the <a href="https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme">Vercel Platform</a>.</p>
    <p>For more details, check out our <a href="https://nextjs.org/docs/app/building-your-application/deploying">Next.js deployment documentation</a>.</p>

  <hr>
    <p>Feel free to customize this README further to suit your project's needs!</p>
