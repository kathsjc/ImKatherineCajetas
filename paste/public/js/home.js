document.addEventListener('DOMContentLoaded', function() {
const loadWorkers = document.getElementById('workers-tab');
const loadJobs = document.getElementById('jobs-tab');
const workersBtn = document.getElementById('workersBtn');
const jobsBtn = document.getElementById('jobsBtn');
const settingsBtn = document.getElementById('settings-btn');
const toasts = document.querySelectorAll('.toast');
const writerOverlay = document.getElementById('rewriter-overlay');
const analyzerOverlay = document.getElementById('analyzer-overlay');
const delWorkerOverlay = document.getElementById('del-worker-overlay');
const delJobOverlay = document.getElementById('del-job-overlay');

toasts.forEach(toast => {
    toast.classList.add('hidden');
});

jobsBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    loadWorkers.classList.remove('active');
    loadJobs.classList.add('active');
    jobsBtn.classList.add('active');
    workersBtn.classList.remove('active');
});

workersBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    loadWorkers.classList.add('active');
    loadJobs.classList.remove('active');
    jobsBtn.classList.remove('active');
    workersBtn.classList.add('active');
});

settingsBtn.addEventListener('click', function() {
    window.location.href = './settings';
});

document.querySelector('header h1').addEventListener('click', function() {
    window.location.href = './home';
});

document.getElementById('backBtn')?.addEventListener('click', function() {
    window.location.href = './home';
});

document.getElementById('close-rewriter')?.addEventListener('click', function() {
    writerOverlay.classList.add('hidden');
});
  
document.getElementById('cancel-analyzer')?.addEventListener('click', function() {
    analyzerOverlay.classList.add('hidden');
});

document.getElementById('cancel-del-worker')?.addEventListener('click', function() {
    delWorkerOverlay.classList.add('hidden');
});

document.getElementById('cancel-del-job')?.addEventListener('click', function() {
    delJobOverlay.classList.add('hidden');
});

document.querySelector('#summarizer-complete button').addEventListener('click', function(){
    document.getElementById('summarizer-complete').classList.add('hidden');
});

document.querySelector('#summarizer-delete button').addEventListener('click', function(){
    document.getElementById('summarizer-delete').classList.add('hidden');
});

document.querySelector('#summarizer-paste button').addEventListener('click', function(){
    document.getElementById('summarizer-paste').classList.add('hidden');
});

document.querySelector('#summarizer-success button').addEventListener('click', function(){
    document.getElementById('summarizer-success').classList.add('hidden');
});

document.querySelector('#summarizer-success button').addEventListener('click', function(){
    document.getElementById('summarizer-success').classList.add('hidden');
});

document.querySelector('#copy-success button').addEventListener('click', function(){
    document.getElementById('copy-success').classList.add('hidden');
});

document.querySelector('#update-toast button').addEventListener('click', function(){
  document.getElementById('update-toast').classList.add('hidden');
});

const copyBtn = document.querySelectorAll('.copy-button');
const copyToast = document.getElementById('copy-success');
copyBtn.forEach(button => {
    button.addEventListener('click', () => {
      copyToast.classList.remove('hidden');
      setTimeout(() => {
        copyToast.classList.add('hidden');
      }, 2000);
    });
});

const pasteBtn = document.querySelectorAll('.paste-button');
const pasteToast = document.getElementById('summarizer-paste');
pasteBtn.forEach(button => {
    button.addEventListener('click', () => {
      pasteToast.classList.remove('hidden');
      setTimeout(() => {
        pasteToast.classList.add('hidden');
      }, 2000);
    });
});

const modalcopyBtn = document.getElementById('copy-job-btn');
const copyText = document.getElementById('text-content');
modalcopyBtn?.addEventListener('click', () => {
  copyToast.classList.remove('hidden');
  navigator.clipboard.writeText(copyText.value);
  setTimeout(() => {
    copyToast.classList.add('hidden');
  }, 2000);
})

const delBtn = document.querySelectorAll('.del-button');
const delToast = document.getElementById('summarizer-delete');
delBtn.forEach(button => {
    button.addEventListener('click', () => {
      delToast.classList.remove('hidden');
      setTimeout(() => {
        delToast.classList.add('hidden');
      }, 2000);
    });
});

const updateText = document.getElementById('update-analyzer')
const updateToast = document.getElementById('update-toast');
updateText.addEventListener('click', function() {
  analyzerOverlay.classList.add('hidden');
  updateToast.classList.remove('hidden');
  setTimeout(() => {
    updateToast.classList.add('hidden');
  }, 2000);
});

const modalDelBtn = document.getElementById('del-job-btn');
modalDelBtn?.addEventListener('click', () => {
  delJobOverlay.classList.remove('hidden');
})

const editBtn = document.querySelectorAll('.edit-button');
editBtn.forEach(button => {
    button.addEventListener('click', () => {
      analyzerOverlay.classList.remove('hidden');
    });
});

const deleteBtn = document.querySelectorAll('.delete-button');
deleteBtn.forEach(button => {
    button.addEventListener('click', () => {
      delWorkerOverlay.classList.remove('hidden');
    });
});

const seeMore = document.querySelectorAll('.see-more');
seeMore.forEach(button => {
    button.addEventListener('click', () => {
      writerOverlay.classList.remove('hidden');
    });
});

const modalText = document.getElementById('analyzer-text');
const charCountSpan = document.getElementById('char-count');

function updateCharCount() {
  const currentLength = modalText?.value.length;
  if (charCountSpan){
    charCountSpan.textContent = `${currentLength}/200`;
  }
}

modalText?.addEventListener('input', updateCharCount);
updateCharCount();

document.querySelectorAll('.status-arrow').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.worker-card');
    const recentJobs = card?.querySelector('.recent-jobs');
    const skeletons = recentJobs?.querySelector('#job-skeleton');
    const realJobs = recentJobs?.querySelector('#jobs-loaded');
    const jobCard = button.closest('.job-category');
    const jobList = jobCard?.querySelector('.category-jobs');

    clearTimeout(recentJobs?.autoCloseTimer);

    if (recentJobs?.classList.contains('expanded')) {
      if (recentJobs) {
        recentJobs.style.height = recentJobs.scrollHeight + 'px';
      }
      requestAnimationFrame(() => {
        if (recentJobs) {
          recentJobs.style.height = '0px';
        }
      });
      recentJobs?.classList.remove('expanded');
      recentJobs?.classList.remove('mt-[24px]');
      button.classList.remove('rotate-360');
    } else {
      recentJobs?.classList.add('expanded');
      recentJobs?.classList.add('mt-[24px]');
      if (recentJobs) {
        recentJobs.style.height = recentJobs.scrollHeight + 'px';
      }
      button.classList.add('rotate-360');

      skeletons?.classList.remove('hidden', 'opacity-0');
      skeletons?.classList.add('opacity-100');

      realJobs?.classList.add('hidden');
      realJobs?.classList.remove('opacity-100');
      realJobs?.classList.add('opacity-0');

      recentJobs?.addEventListener('transitionend', function handler(e) {
        if (e.propertyName === 'height') {
          if (recentJobs?.classList.contains('expanded')) {
            recentJobs.style.height = 'auto';
          }
          recentJobs?.removeEventListener('transitionend', handler);
        }
      });

      setTimeout(() => {
        skeletons?.classList.remove('opacity-100');
        skeletons?.classList.add('opacity-0');

        realJobs?.classList.remove('hidden', 'opacity-0');
        realJobs?.classList.add('opacity-100');

        setTimeout(() => {
          skeletons?.classList.add('hidden');
        }, 300);
      }, 1000);

    if (recentJobs){
      recentJobs.autoCloseTimer = setTimeout(() => {
        if (recentJobs) {
          recentJobs.style.height = recentJobs.scrollHeight + 'px';
        }
        requestAnimationFrame(() => {
          recentJobs.style.height = '0px';
        });
        recentJobs.classList.remove('expanded', 'mt-[24px]');
        button.classList.remove('rotate-360');
      }, 6000);
    }
    }

    if (jobList?.classList.contains('expanded')) {
      jobList.style.height = jobList.scrollHeight + 'px';
      requestAnimationFrame(() => {
        jobList.style.height = '0px';
      });
      jobList.classList.remove('expanded');
      button.classList.remove('rotate-360');
    } else {
      jobList?.classList.add('expanded');
      if (jobList) {
        jobList.style.height = jobList.scrollHeight + 'px';
      }
      button.classList.add('rotate-360');

      jobList?.addEventListener('transitionend', function handler(e) {
        if (e.propertyName === 'height') {
          if (jobList.classList.contains('expanded')) {
            jobList.style.height = 'auto';
          }
          jobList.removeEventListener('transitionend', handler);
        }
      });
    }
  });
});

});
