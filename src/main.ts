import './style.css'
import { Main as randomPersonApp } from './app/randomPersonApp';
import { Main as personalizePersonApp } from './app/personalizePersonApp';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

  <div class="my-app flex flex-col gap-y-10">
  </div>


  <div class="my-app-sec flex flex-col gap-y-10 mt-32">
  </div>
`

const $app = document.querySelector<HTMLDivElement>('.my-app')!;
const $appSec = document.querySelector<HTMLDivElement>('.my-app-sec')!;

personalizePersonApp($app);
randomPersonApp($appSec);

