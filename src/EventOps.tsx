import { useEffect, useState } from 'react'
import { ConvexProvider, ConvexReactClient, useMutation, useQuery } from 'convex/react'
import { makeFunctionReference } from 'convex/server'
import styles from './EventOps.module.css'

interface Task {
  id: string
  label: string
  subs?: string[]
}

interface Phase {
  id: string
  tag: string
  title: string
  tasks: Task[]
}

interface EventDetails {
  date: string
  contact1: string
  contact1Phone: string
  contact2: string
  contact2Phone: string
  hostName: string
  docsLink: string
  address: string
  mapLink: string
  images: EventImage[]
}

interface EventImage {
  url: string
  storageId?: string
}

interface Performer {
  id: string
  name: string
  date: string
  endDate: string
  comment: string
}

interface ExpenseItem {
  id: string
  name: string
  label: string
  value: string
}

interface ProjectData {
  checked: Record<string, boolean>
  values: Record<string, string>
  details: EventDetails
}

interface EventProject extends ProjectData {
  _id: string
  name: string
}

const emptyDetails: EventDetails = {
  date: '',
  contact1: '',
  contact1Phone: '',
  contact2: '',
  contact2Phone: '',
  hostName: '',
  docsLink: '',
  address: '',
  mapLink: '',
  images: [],
}

const PHASES: Phase[] = [
  {
    id: 'prebooking', tag: '01', title: 'Pre-build - at booking',
    tasks: [
      { id: 'site-visit', label: 'Site visit', subs: [
        'Square footage / fit for equipment', 'Storage',
        'Elevators / stairs access', 'Hallway access (move-in / move-out paths)',
        'Street / garage access for loading / unloading',
        'Lighting', 'Electrical', 'Building rules / restrictions',
      ]},
      { id: 'crescendo', label: 'Crescendo floor availability (dates, return window, vehicle & crew needed)' },
      { id: 'contracts', label: 'Contracts / agreements with partners', subs: [
        'Music agreements', 'Dates, hours, schedules', 'Scope out personnel needs',
        'Understand # potential visitors',
        'Understand what will need to be moved at facility during build',
      ]},
    ],
  },
  {
    id: 'postbooking', tag: '02', title: 'Pre-build - post booking',
    tasks: [
      { id: 'test-equip', label: 'Test all equipment' },
      { id: 'confirm-logistics', label: 'Confirm all logistics' },
      { id: 'confirm-personnel', label: 'Confirm all personnel hires / schedules' },
      { id: 'time-action', label: 'Create time / action calendar' },
      { id: 'guest-plan', label: 'Work through guest plan and write scripts', subs: [
        'Queuing', 'Ticketing', 'Ingress / egress',
        'Rules (no shoes, no food & bev)', 'Performance hours', 'Breaks',
      ]},
    ],
  },
  {
    id: 'build', tag: '03', title: 'Build',
    tasks: [
      { id: 'get-crescendo', label: 'Get equipment from Crescendo' },
      { id: 'pack-tp', label: 'Pack up equipment at Twin Peaks' },
      { id: 'pick-structure', label: 'Pick up / pack structure and wall panels' },
      { id: 'move-in-logistics', label: 'Move-in logistics', subs: [
        'Parking cars / vans', 'Confirm move-in hours',
        'Equipment available to help load / unload',
        'People available to help load / unload',
        'Staging areas for equipment',
      ]},
      { id: 'setup', label: 'Set up equipment in specified space' },
      { id: 'dry-run', label: 'Dry run and fine-tuning' },
    ],
  },
  {
    id: 'operate', tag: '04', title: 'Operate - go live',
    tasks: [
      { id: 'line-mgmt', label: 'Line management / greeter / orientation' },
      { id: 'operator', label: 'Operator (music) on shift' },
      { id: 'host-schticker', label: 'Host / Schticker' },
      { id: 'host-schticker-2', label: 'Host / Schticker 2' },
      { id: 'data-capture', label: 'Data capture', subs: [
        '# of guests who went through experience',
        'Collect feedback via QR code or in-person comments',
      ]},
    ],
  },
  {
    id: 'strike', tag: '05', title: 'Strike / tear down',
    tasks: [
      { id: 'takedown', label: 'Take down, repack equipment (inventory, identify cleaning / repair needs)' },
      { id: 'load-out', label: 'Physically move equipment into vehicles' },
      { id: 'return-equip', label: 'Return equipment to Crescendo / TP or other storage' },
      { id: 'clean-space', label: 'Clean space and conduct exit site check' },
      { id: 'advise-organizer', label: 'Advise event organizer when rooms are clear' },
      { id: 'debrief', label: 'Lead 360 debrief and get feedback', subs: [
        'Event organizer', 'All personnel by category',
      ]},
    ],
  },
  {
    id: 'equipment', tag: '06', title: 'Equipment checklist',
    tasks: [
      { id: 'subfloor', label: 'Subfloor from Crescendo (box/set)' },
      { id: 'framework', label: 'Metal framework / structure (box/set)' },
      { id: 'speaker-brackets', label: 'Speaker brackets / shelves (box/set)' },
      { id: 'fabric-panels', label: 'Fabric panels (box/set)' },
      { id: 'rugs', label: 'Subfloor rugs (box/set)' },
      { id: 'speakers', label: 'Speakers (box/set) - labelled & tracked' },
      { id: 'laptop', label: 'Laptop / backup laptop' },
      { id: 'audio-rack', label: 'Audio gear rack' },
      { id: 'signs', label: 'Signs for outside / inside' },
      { id: 'lights', label: 'Lights (box/set) - all parts labelled & diagrammed' },
      { id: 'wiring', label: 'Power/gear wiring (box)' },
      { id: 'speaker-wiring', label: 'Speaker Wiring (box)' },
      { id: 'mackie-subwoofer', label: 'Mackie Subwoofer' },
      { id: 'podium', label: 'Podium' },
      { id: 'goldie', label: 'Goldie' },
      { id: 'furniture', label: 'Furniture' },
      { id: 'tool-bag', label: 'Tool Bag' },
      { id: 'backup-speakers', label: 'Backup speakers (box/set) - labelled & tracked' },
    ],
  },
  {
    id: 'toolkit', tag: '07', title: 'Tool kit checklist',
    tasks: [
      { id: 'zip-ties', label: 'Zip ties 12" black x100' },
      { id: 'swift-tak', label: 'Swift-tak guns (2)' },
      { id: 'scissors', label: 'Scissors (2)' },
      { id: 'wire-cutters', label: 'Wire cutters (1)' },
      { id: 'gaffer', label: 'Gaffer tape (2 rolls)' },
      { id: 'ext-cords', label: 'Extension cords (5+)' },
      { id: 'flashlights', label: 'Flashlights / headlamps (2)' },
      { id: 'rug-tape', label: 'Rug tape (1)' },
      { id: 'decibel', label: 'Decibel meter (1)' },
    ],
  },
  {
    id: 'expenses', tag: '08', title: 'Expenses & Purchases',
    tasks: [],
  },
]

const convexUrl = import.meta.env.VITE_CONVEX_URL
const convexClient = convexUrl ? new ConvexReactClient(convexUrl) : null

const listProjectsRef = makeFunctionReference<'query', {}, EventProject[]>('eventOps:listProjects')
const getProjectRef = makeFunctionReference<'query', { projectId: string }, EventProject | null>('eventOps:getProject')
const createProjectRef = makeFunctionReference<'mutation', { name: string }, string>('eventOps:createProject')
const deleteProjectRef = makeFunctionReference<'mutation', { projectId: string }, null>('eventOps:deleteProject')
const toggleItemRef = makeFunctionReference<'mutation', { projectId: string; itemId: string }, null>('eventOps:toggleItem')
const setValueRef = makeFunctionReference<'mutation', { projectId: string; itemId: string; value: string }, null>('eventOps:setValue')
const setDetailsRef = makeFunctionReference<'mutation', { projectId: string; details: Omit<EventDetails, 'images'> }, null>('eventOps:setDetails')
const generateImageUploadUrlRef = makeFunctionReference<'mutation', {}, string>('eventOps:generateImageUploadUrl')
const addUploadedImageRef = makeFunctionReference<'mutation', { projectId: string; storageId: string }, null>('eventOps:addUploadedImage')
const removeImageRef = makeFunctionReference<'mutation', { projectId: string; storageId?: string; legacyUrl?: string }, null>('eventOps:removeImage')

const EVENT_END_DATE_VALUE_KEY = '__event_end_date'
const PERFORMERS_VALUE_KEY = '__performers_json'
const EXPENSES_VALUE_KEY = '__expenses_json'

function defaultExpenses(): ExpenseItem[] {
  return [
    { id: crypto.randomUUID(), name: 'Transport', label: 'Truck', value: '' },
    { id: crypto.randomUUID(), name: 'Transport', label: 'Gas', value: '' },
    { id: crypto.randomUUID(), name: 'Transport', label: 'Parking', value: '' },
  ]
}

function allTaskIds(): string[] {
  return PHASES.flatMap((phase) =>
    phase.tasks.flatMap((task) => [task.id, ...(task.subs?.map((_, index) => `${task.id}_sub_${index}`) ?? [])]),
  )
}

function parsePerformers(raw: string | undefined): Performer[] {
  if (!raw?.trim()) return []

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.flatMap((entry) => {
      if (!entry || typeof entry !== 'object') return []
      const candidate = entry as Partial<Performer>
      if (typeof candidate.id !== 'string') return []

      return [{
        id: candidate.id,
        name: typeof candidate.name === 'string' ? candidate.name : '',
        date: typeof candidate.date === 'string' ? candidate.date : '',
        endDate: typeof (candidate as Partial<Performer>).endDate === 'string' ? (candidate as Partial<Performer>).endDate ?? '' : '',
        comment: typeof candidate.comment === 'string' ? candidate.comment : '',
      }]
    })
  } catch {
    return []
  }
}

function serializePerformers(performers: Performer[]): string {
  return JSON.stringify(performers)
}

function parseExpenses(raw: string | undefined): ExpenseItem[] {
  if (!raw?.trim()) return defaultExpenses()

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return defaultExpenses()

    const items = parsed.flatMap((entry) => {
      if (!entry || typeof entry !== 'object') return []
      const candidate = entry as Partial<ExpenseItem>
      if (typeof candidate.id !== 'string') return []

      return [{
        id: candidate.id,
        name: typeof candidate.name === 'string' ? candidate.name : 'Transport',
        label: typeof candidate.label === 'string' ? candidate.label : '',
        value: typeof candidate.value === 'string' ? candidate.value : '',
      }]
    })

    return items.length ? items : defaultExpenses()
  } catch {
    return defaultExpenses()
  }
}

function serializeExpenses(expenses: ExpenseItem[]): string {
  return JSON.stringify(expenses)
}

function sumExpenses(expenses: ExpenseItem[]): number {
  return expenses.reduce((total, item) => {
    const numeric = Number.parseFloat(item.value.replace(/[^0-9.-]/g, ''))
    return total + (Number.isFinite(numeric) ? numeric : 0)
  }, 0)
}

function fileToDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

async function compressImageFile(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/') || /image\/(gif|heic|heif|avif)/i.test(file.type)) {
    return file
  }

  try {
    const original = await fileToDataUrl(file)
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = original
    })

    const maxDimension = 1440
    const scale = Math.min(1, maxDimension / Math.max(image.width, image.height))
    const width = Math.max(1, Math.round(image.width * scale))
    const height = Math.max(1, Math.round(image.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) {
      return file
    }

    context.drawImage(image, 0, 0, width, height)
    const compressed = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.78)
    })
    return compressed ?? file
  } catch {
    return file
  }
}

function normalizeDetails(details: Partial<EventDetails> | null | undefined): EventDetails {
  return {
    ...emptyDetails,
    ...(details ?? {}),
    images: Array.isArray(details?.images) ? details.images.filter((image): image is EventImage => {
      return !!image && typeof image === 'object' && typeof image.url === 'string'
    }) : [],
  }
}

function extractAddressFromGoogleMapsUrl(input: string): string {
  try {
    const url = new URL(input)
    if (!/google\./i.test(url.hostname) && !/goo\.gl$/i.test(url.hostname)) {
      return ''
    }

    const q = url.searchParams.get('q') || url.searchParams.get('query')
    if (q) {
      return decodeURIComponent(q).replace(/\+/g, ' ').trim()
    }

    const pathParts = url.pathname.split('/').filter(Boolean)
    const placeIndex = pathParts.findIndex((part) => part === 'place')
    if (placeIndex >= 0 && pathParts[placeIndex + 1]) {
      return decodeURIComponent(pathParts[placeIndex + 1]).replace(/\+/g, ' ').trim()
    }

    const searchIndex = pathParts.findIndex((part) => part === 'search')
    if (searchIndex >= 0 && pathParts[searchIndex + 1]) {
      return decodeURIComponent(pathParts[searchIndex + 1]).replace(/\+/g, ' ').trim()
    }
  } catch {
    return ''
  }

  return ''
}

function Lightbox({
  src,
  onClose,
}: {
  src: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <div className={styles.lightboxBackdrop} />
      <img
        className={styles.lightboxImage}
        src={src}
        alt="Event reference"
        onClick={(event) => event.stopPropagation()}
      />
      <button className={styles.lightboxClose} type="button" onClick={onClose}>Close</button>
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polyline points="4,6 8,10 12,6" />
    </svg>
  )
}

interface PhaseBlockProps {
  phase: Phase
  checked: Record<string, boolean>
  values: Record<string, string>
  draftValues: Record<string, string>
  open: boolean
  onToggle: (id: string) => void
  onToggleOpen: () => void
  onDraftValueChange: (id: string, value: string) => void
  onValueCommit: (id: string) => void
}

function PhaseBlock({
  phase,
  checked,
  values,
  draftValues,
  open,
  onToggle,
  onToggleOpen,
  onDraftValueChange,
  onValueCommit,
}: PhaseBlockProps) {
  const totalTasks = phase.tasks.reduce((count, task) => count + 1 + (task.subs?.length ?? 0), 0)
  const doneTasks = phase.tasks.reduce((count, task) => {
    let completed = checked[task.id] && values[task.id]?.trim() ? 1 : 0
    task.subs?.forEach((_, index) => {
      const subId = `${task.id}_sub_${index}`
      if (checked[subId] && values[subId]?.trim()) {
        completed += 1
      }
    })
    return count + completed
  }, 0)
  const complete = doneTasks === totalTasks && totalTasks > 0

  const commitOnEnter = (event: React.KeyboardEvent<HTMLInputElement>, itemId: string) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur()
      onValueCommit(itemId)
    }
  }

  return (
    <div className={`${styles.phase} ${complete ? styles.phaseComplete : ''}`}>
      <button type="button" className={styles.phaseHeader} onClick={onToggleOpen}>
        <div className={styles.phaseLeft}>
          <span className={styles.phaseTag}>{phase.tag}</span>
          <span className={styles.phaseTitle}>{phase.title}</span>
        </div>
        <div className={styles.phaseRight}>
          <span className={styles.phaseCount}>{doneTasks}/{totalTasks}</span>
          <ChevronIcon open={open} />
        </div>
      </button>

      {open ? (
        <div className={styles.phaseBody}>
          {phase.tasks.map((task) => {
            const itemValue = draftValues[task.id] ?? ''
            return (
              <div key={task.id}>
                <div className={styles.taskRow} onClick={() => onToggle(task.id)}>
                  <input
                    type="checkbox"
                    className={styles.cb}
                    checked={!!checked[task.id]}
                    onChange={() => onToggle(task.id)}
                    onClick={(event) => event.stopPropagation()}
                  />
                  <span className={`${styles.taskLabel} ${checked[task.id] ? styles.done : ''}`}>
                    {task.label}
                  </span>
                  <input
                    type="text"
                    className={styles.valueInput}
                    value={itemValue}
                    placeholder="Value"
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => onDraftValueChange(task.id, event.target.value)}
                    onBlur={() => onValueCommit(task.id)}
                    onKeyDown={(event) => commitOnEnter(event, task.id)}
                  />
                </div>

                {task.subs?.map((sub, index) => {
                  const subId = `${task.id}_sub_${index}`
                  const subValue = draftValues[subId] ?? ''
                  return (
                    <div key={subId} className={styles.subRow} onClick={() => onToggle(subId)}>
                      <input
                        type="checkbox"
                        className={styles.subCb}
                        checked={!!checked[subId]}
                        onChange={() => onToggle(subId)}
                        onClick={(event) => event.stopPropagation()}
                      />
                      <span className={`${styles.subLabel} ${checked[subId] ? styles.done : ''}`}>
                        {sub}
                      </span>
                      <input
                        type="text"
                        className={styles.subValueInput}
                        value={subValue}
                        placeholder="Value"
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => onDraftValueChange(subId, event.target.value)}
                        onBlur={() => onValueCommit(subId)}
                        onKeyDown={(event) => commitOnEnter(event, subId)}
                      />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

interface ExpensesBlockProps {
  phase: Phase
  open: boolean
  expenses: ExpenseItem[]
  draftExpenses: Record<string, ExpenseItem>
  onToggleOpen: () => void
  onExpenseChange: (expenseId: string, field: 'name' | 'label' | 'value', value: string) => void
  onExpenseCommit: (expenseId: string) => void
  onAddExpense: () => void
}

function ExpensesBlock({
  phase,
  open,
  expenses,
  draftExpenses,
  onToggleOpen,
  onExpenseChange,
  onExpenseCommit,
  onAddExpense,
}: ExpensesBlockProps) {
  const total = sumExpenses(expenses)

  return (
    <div className={styles.phase}>
      <button type="button" className={styles.phaseHeader} onClick={onToggleOpen}>
        <div className={styles.phaseLeft}>
          <span className={styles.phaseTag}>{phase.tag}</span>
          <span className={styles.phaseTitle}>{phase.title}</span>
        </div>
        <div className={styles.phaseRight}>
          <span className={styles.phaseCount}>${total.toFixed(2)}</span>
          <ChevronIcon open={open} />
        </div>
      </button>

      {open ? (
        <div className={styles.phaseBody}>
          <div className={styles.expenseGroup}>
            <div className={styles.expenseGroupHeader}>
              <span className={styles.expenseGroupTitle}>Transport</span>
              <button type="button" className={styles.btnGhost} onClick={onAddExpense}>+ Add</button>
            </div>

            <div className={styles.expenseList}>
              {expenses.map((expense) => {
                const draft = draftExpenses[expense.id] ?? expense
                return (
                  <div key={expense.id} className={styles.expenseRow}>
                    <input
                      className={styles.expenseNameInput}
                      type="text"
                      value={draft.name}
                      placeholder="Name"
                      onChange={(event) => onExpenseChange(expense.id, 'name', event.target.value)}
                      onBlur={() => onExpenseCommit(expense.id)}
                    />
                    <input
                      className={styles.expenseLabelInput}
                      type="text"
                      value={draft.label}
                      placeholder="Field"
                      onChange={(event) => onExpenseChange(expense.id, 'label', event.target.value)}
                      onBlur={() => onExpenseCommit(expense.id)}
                    />
                    <input
                      className={styles.expenseValueInput}
                      type="text"
                      value={draft.value}
                      placeholder="0.00"
                      onChange={(event) => onExpenseChange(expense.id, 'value', event.target.value)}
                      onBlur={() => onExpenseCommit(expense.id)}
                    />
                  </div>
                )
              })}
            </div>

            <div className={styles.expenseTotalRow}>
              <span className={styles.expenseTotalLabel}>Total Cost</span>
              <span className={styles.expenseTotalValue}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

interface DetailsPanelProps {
  details: EventDetails
  performers: Performer[]
  performerDrafts: Record<string, Performer>
  eventEndDate: string
  onDetailChange: (field: Exclude<keyof EventDetails, 'images'>, value: string) => void
  onDetailCommit: (field: Exclude<keyof EventDetails, 'images'>, value: string) => void
  onEventEndDateChange: (value: string) => void
  onEventEndDateCommit: () => void
  onPerformerChange: (performerId: string, field: 'name' | 'date' | 'endDate' | 'comment', value: string) => void
  onPerformerCommit: (performerId: string) => void
  onAddPerformer: () => void
  onDeletePerformer: (performerId: string) => void
  onImageUpload: (files: FileList | null) => void
  onRemoveImage: (image: EventImage) => void
}

function DetailsPanel({
  details,
  performers,
  performerDrafts,
  eventEndDate,
  onDetailChange,
  onDetailCommit,
  onEventEndDateChange,
  onEventEndDateCommit,
  onPerformerChange,
  onPerformerCommit,
  onAddPerformer,
  onDeletePerformer,
  onImageUpload,
  onRemoveImage,
}: DetailsPanelProps) {
  const [openSection, setOpenSection] = useState<'details' | 'performers' | 'images' | null>(null)
  const linkFields: Array<Extract<keyof EventDetails, 'docsLink' | 'mapLink'>> = ['docsLink', 'mapLink']
  const priorityFieldRows: Array<{
    label: string
    field: Exclude<keyof EventDetails, 'images'>
    placeholder: string
    type?: 'text' | 'date'
  }> = [
    { label: 'Event / host name', field: 'hostName', placeholder: 'Venue or organizer' },
    { label: 'Docs/Link', field: 'docsLink', placeholder: 'https://...' },
  ]

  const fieldRows: Array<{
    label: string
    field: Exclude<keyof EventDetails, 'images'>
    placeholder: string
    type?: 'text' | 'date'
  }> = [
    { label: 'Contact 1', field: 'contact1', placeholder: 'Name / email / phone' },
    { label: 'Contact 1 phone', field: 'contact1Phone', placeholder: '(555) 555-5555' },
    { label: 'Contact 2', field: 'contact2', placeholder: 'Name / email / phone' },
    { label: 'Contact 2 phone', field: 'contact2Phone', placeholder: '(555) 555-5555' },
    { label: 'Address', field: 'address', placeholder: 'Street address' },
    { label: 'Google map link', field: 'mapLink', placeholder: 'https://maps.google.com/...' },
  ]

  return (
    <aside className={styles.sidebar}>
      <section className={styles.sidebarCard}>
        <button type="button" className={styles.sidebarToggle} onClick={() => setOpenSection((current) => current === 'details' ? null : 'details')}>
          <span className={styles.sidebarTitle}>Event Details</span>
          <ChevronIcon open={openSection === 'details'} />
        </button>
        {openSection === 'details' ? (
          <div className={styles.sidebarFields}>
            {priorityFieldRows.map((row) => (
              <label key={row.field} className={styles.detailField}>
                <span className={styles.detailLabel}>{row.label}</span>
                <div className={styles.detailInputRow}>
                  <input
                    className={styles.detailInput}
                    type={row.type ?? 'text'}
                    value={details[row.field]}
                    placeholder={row.placeholder}
                    onChange={(event) => onDetailChange(row.field, event.target.value)}
                    onBlur={(event) => onDetailCommit(row.field, event.target.value)}
                  />
                  {linkFields.includes(row.field as Extract<keyof EventDetails, 'docsLink' | 'mapLink'>) && details[row.field].trim() ? (
                    <a
                      className={styles.linkButton}
                      href={details[row.field]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                  ) : null}
                </div>
              </label>
            ))}
            <div className={styles.detailField}>
              <span className={styles.detailLabel}>Event dates</span>
              <div className={styles.dateRangeRow}>
                <input
                  className={styles.detailInput}
                  type="date"
                  value={details.date}
                  onChange={(event) => onDetailChange('date', event.target.value)}
                  onBlur={(event) => onDetailCommit('date', event.target.value)}
                />
                <input
                  className={styles.detailInput}
                  type="date"
                  value={eventEndDate}
                  onChange={(event) => onEventEndDateChange(event.target.value)}
                  onBlur={onEventEndDateCommit}
                />
              </div>
            </div>
            {fieldRows.map((row) => (
              <label key={row.field} className={styles.detailField}>
                <span className={styles.detailLabel}>{row.label}</span>
                <div className={styles.detailInputRow}>
                  <input
                    className={styles.detailInput}
                    type={row.type ?? 'text'}
                    value={details[row.field]}
                    placeholder={row.placeholder}
                    onChange={(event) => onDetailChange(row.field, event.target.value)}
                    onBlur={(event) => onDetailCommit(row.field, event.target.value)}
                  />
                  {linkFields.includes(row.field as Extract<keyof EventDetails, 'docsLink' | 'mapLink'>) && details[row.field].trim() ? (
                    <a
                      className={styles.linkButton}
                      href={details[row.field]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                  ) : null}
                </div>
              </label>
            ))}
          </div>
        ) : null}
      </section>

      <section className={styles.sidebarCard}>
        <button type="button" className={styles.sidebarToggle} onClick={() => setOpenSection((current) => current === 'performers' ? null : 'performers')}>
          <span className={`${styles.sidebarTitle} ${styles.performerSidebarTitle}`}>Performer Scheduling</span>
          <ChevronIcon open={openSection === 'performers'} />
        </button>
        {openSection === 'performers' ? (
          <div className={styles.performerSection}>
            <div className={styles.performerActions}>
              <button type="button" className={styles.btnGhost} onClick={onAddPerformer}>+ Add</button>
            </div>

            <div className={styles.performerList}>
              {performers.length === 0 ? (
                <div className={styles.imageEmpty}>Add performers here to track names, dates, and notes for this event.</div>
              ) : (
                performers.map((performer, index) => {
                  const draft = performerDrafts[performer.id] ?? performer
                  return (
                    <div key={performer.id} className={styles.performerCard}>
                      <div className={styles.performerHeader}>
                        <div className={styles.performerTitle}>Performer {index + 1}</div>
                        <button type="button" className={styles.btnDanger} onClick={() => onDeletePerformer(performer.id)}>Delete</button>
                      </div>

                      <label className={styles.detailField}>
                        <span className={styles.detailLabel}>Performer name</span>
                        <input
                          className={styles.detailInput}
                          type="text"
                          value={draft.name}
                          placeholder="Artist or performer"
                          onChange={(event) => onPerformerChange(performer.id, 'name', event.target.value)}
                          onBlur={() => onPerformerCommit(performer.id)}
                        />
                      </label>

                      <label className={styles.detailField}>
                        <span className={styles.detailLabel}>Performance dates</span>
                        <div className={styles.dateRangeRow}>
                          <input
                            className={styles.detailInput}
                            type="date"
                            value={draft.date}
                            onChange={(event) => onPerformerChange(performer.id, 'date', event.target.value)}
                            onBlur={() => onPerformerCommit(performer.id)}
                          />
                          <input
                            className={styles.detailInput}
                            type="date"
                            value={draft.endDate}
                            onChange={(event) => onPerformerChange(performer.id, 'endDate', event.target.value)}
                            onBlur={() => onPerformerCommit(performer.id)}
                          />
                        </div>
                      </label>

                      <label className={styles.detailField}>
                        <span className={styles.detailLabel}>Performer comment</span>
                        <textarea
                          className={styles.detailTextarea}
                          value={draft.comment}
                          placeholder="Notes, availability, set timing, or special requirements"
                          onChange={(event) => onPerformerChange(performer.id, 'comment', event.target.value)}
                          onBlur={() => onPerformerCommit(performer.id)}
                        />
                      </label>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        ) : null}
      </section>

      <section className={styles.sidebarCard}>
        <button type="button" className={styles.sidebarToggle} onClick={() => setOpenSection((current) => current === 'images' ? null : 'images')}>
          <span className={styles.sidebarTitle}>Images</span>
          <ChevronIcon open={openSection === 'images'} />
        </button>
        {openSection === 'images' ? (
          <>
            <div className={styles.sidebarHeaderRow}>
              <div />
              <label className={styles.btnGhost} role="button">
                Upload image
                <input
                  className={styles.fileInput}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => {
                    onImageUpload(event.target.files)
                    event.target.value = ''
                  }}
                />
              </label>
            </div>
            <div className={styles.imageList}>
              {details.images.length === 0 ? (
                <div className={styles.imageEmpty}>Upload local images for venue photos, plans, or reference shots.</div>
              ) : (
                details.images.map((image, index) => (
                  <div key={`${index}-${image.storageId ?? image.url.slice(0, 40)}`} className={styles.imageItem}>
                    <div className={styles.imageInputRow}>
                      <div className={styles.imageMeta}>Image {index + 1}</div>
                      <button className={styles.btnDanger} type="button" onClick={() => onRemoveImage(image)}>Remove</button>
                    </div>
                    {image.url.trim() ? (
                      <button className={styles.imagePreviewButton} type="button" onClick={() => window.dispatchEvent(new CustomEvent('eventops:open-image', { detail: image.url }))}>
                        <img className={styles.imagePreview} src={image.url} alt={`Reference ${index + 1}`} />
                      </button>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </>
        ) : null}
      </section>
    </aside>
  )
}

function EventOpsContent() {
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [saved, setSaved] = useState(false)
  const [draftValues, setDraftValues] = useState<Record<string, string>>({})
  const [draftDetails, setDraftDetails] = useState<EventDetails>(emptyDetails)
  const [performers, setPerformers] = useState<Performer[]>([])
  const [performerDrafts, setPerformerDrafts] = useState<Record<string, Performer>>({})
  const [expenses, setExpenses] = useState<ExpenseItem[]>(defaultExpenses())
  const [expenseDrafts, setExpenseDrafts] = useState<Record<string, ExpenseItem>>({})
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [openPhaseId, setOpenPhaseId] = useState<string | null>(null)
  const [detailsDirty, setDetailsDirty] = useState(false)
  const [detailsProjectId, setDetailsProjectId] = useState<string | null>(null)

  const projects = useQuery(listProjectsRef, {}) ?? []
  const project = useQuery(getProjectRef, currentProjectId ? { projectId: currentProjectId } : 'skip')
  const createProject = useMutation(createProjectRef)
  const deleteProject = useMutation(deleteProjectRef)
  const toggleItem = useMutation(toggleItemRef)
  const setValue = useMutation(setValueRef)
  const setDetails = useMutation(setDetailsRef)
  const generateImageUploadUrl = useMutation(generateImageUploadUrlRef)
  const addUploadedImage = useMutation(addUploadedImageRef)
  const removeImage = useMutation(removeImageRef)

  useEffect(() => {
    if (projects.length === 0) {
      setCurrentProjectId(null)
      return
    }

    const hasCurrent = currentProjectId && projects.some((entry) => entry._id === currentProjectId)
    if (!hasCurrent) {
      setCurrentProjectId(projects[0]._id)
    }
  }, [projects, currentProjectId])

  useEffect(() => {
    if (!project) {
      setDraftValues({})
      setDraftDetails(emptyDetails)
      setPerformers([])
      setPerformerDrafts({})
      setExpenses(defaultExpenses())
      setExpenseDrafts({})
      setDetailsDirty(false)
      setDetailsProjectId(null)
      return
    }

    setDraftValues(project.values ?? {})
    const nextPerformers = parsePerformers(project.values?.[PERFORMERS_VALUE_KEY])
    const nextExpenses = parseExpenses(project.values?.[EXPENSES_VALUE_KEY])
    setPerformers(nextPerformers)
    setExpenses(nextExpenses)
    setPerformerDrafts((current) => {
      const next: Record<string, Performer> = {}
      nextPerformers.forEach((performer) => {
        next[performer.id] = current[performer.id] ?? performer
      })
      return next
    })
    setExpenseDrafts((current) => {
      const next: Record<string, ExpenseItem> = {}
      nextExpenses.forEach((expense) => {
        next[expense.id] = current[expense.id] ?? expense
      })
      return next
    })
    const nextDetails = normalizeDetails(project.details)

    if (detailsProjectId !== project._id || !detailsDirty) {
      setDraftDetails(nextDetails)
      setDetailsProjectId(project._id)
      setDetailsDirty(false)
    }
  }, [project])

  useEffect(() => {
    const onOpenImage = (event: Event) => {
      const customEvent = event as CustomEvent<string>
      setLightboxImage(customEvent.detail)
    }

    window.addEventListener('eventops:open-image', onOpenImage)
    return () => window.removeEventListener('eventops:open-image', onOpenImage)
  }, [])

  const triggerSaved = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  const handleCreateProject = async () => {
    const name = newName.trim()
    if (!name) return

    const createdId = await createProject({ name })
    setCurrentProjectId(createdId)
    setNewName('')
    setShowModal(false)
    triggerSaved()
  }

  const handleDeleteProject = async () => {
    if (!currentProjectId || !project) return
    if (!window.confirm(`Delete "${project.name}"? This cannot be undone.`)) return

    await deleteProject({ projectId: currentProjectId })
    triggerSaved()
  }

  const handleToggle = async (itemId: string) => {
    if (!currentProjectId) return
    await toggleItem({ projectId: currentProjectId, itemId })
    triggerSaved()
  }

  const handleDraftValueChange = (itemId: string, value: string) => {
    setDraftValues((current) => ({
      ...current,
      [itemId]: value,
    }))
  }

  const handleValueCommit = async (itemId: string) => {
    if (!currentProjectId || !project) return
    const nextValue = draftValues[itemId] ?? ''
    const currentValue = project.values?.[itemId] ?? ''
    if (nextValue === currentValue) return

    await setValue({ projectId: currentProjectId, itemId, value: nextValue })
    triggerSaved()
  }

  const handleEventEndDateChange = (value: string) => {
    handleDraftValueChange(EVENT_END_DATE_VALUE_KEY, value)
  }

  const handleEventEndDateCommit = async () => {
    await handleValueCommit(EVENT_END_DATE_VALUE_KEY)
  }

  const handleDetailChange = (field: Exclude<keyof EventDetails, 'images'>, value: string) => {
    setDetailsDirty(true)
    setDraftDetails((current) => buildNextDetails(current, field, value))
  }

  const buildNextDetails = (
    current: EventDetails,
    field: Exclude<keyof EventDetails, 'images'>,
    value: string,
  ): EventDetails => {
    const next = {
      ...current,
      [field]: value,
    }

    if (field === 'mapLink') {
      const extractedAddress = extractAddressFromGoogleMapsUrl(value)
      if (extractedAddress) {
        next.address = extractedAddress
      }
    }

    return next
  }

  const commitDetails = async (detailsToSave: EventDetails) => {
    if (!currentProjectId || !project) return
    const projectDetails = normalizeDetails(project.details)
    const comparableDraft = JSON.stringify({ ...detailsToSave, images: [] })
    const comparableSaved = JSON.stringify({ ...projectDetails, images: [] })
    if (comparableDraft === comparableSaved) return

    const { images: _images, ...editableDetails } = detailsToSave
    await setDetails({ projectId: currentProjectId, details: editableDetails })
    setDetailsDirty(false)
    triggerSaved()
  }

  const handleDetailCommit = async (
    field: Exclude<keyof EventDetails, 'images'>,
    value: string,
  ) => {
    const nextDetails = buildNextDetails(draftDetails, field, value)
    setDraftDetails(nextDetails)
    await commitDetails(nextDetails)
  }

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !currentProjectId) return

    for (const file of Array.from(files)) {
      const uploadUrl = await generateImageUploadUrl({})
      const blob = await compressImageFile(file)
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': blob.type || file.type || 'application/octet-stream',
        },
        body: blob,
      })

      if (!uploadResponse.ok) {
        throw new Error('Image upload failed.')
      }

      const { storageId } = await uploadResponse.json() as { storageId?: string }
      if (!storageId) {
        throw new Error('Image upload did not return a storage id.')
      }

      await addUploadedImage({ projectId: currentProjectId, storageId })
    }

    setDetailsDirty(false)
    triggerSaved()
  }

  const handleRemoveImage = async (image: EventImage) => {
    if (!currentProjectId) return

    await removeImage({
      projectId: currentProjectId,
      storageId: image.storageId,
      legacyUrl: image.storageId ? undefined : image.url,
    })
    setDetailsDirty(false)
    triggerSaved()
  }

  const handlePerformerDraftChange = (performerId: string, field: 'name' | 'date' | 'endDate' | 'comment', value: string) => {
    setPerformerDrafts((current) => ({
      ...current,
      [performerId]: {
        ...(current[performerId] ?? performers.find((performer) => performer.id === performerId) ?? {
          id: performerId,
          name: '',
          date: '',
          endDate: '',
          comment: '',
        }),
        [field]: value,
      },
    }))
  }

  const handlePerformersCommit = async (nextPerformers: Performer[]) => {
    if (!currentProjectId) return
    await setValue({
      projectId: currentProjectId,
      itemId: PERFORMERS_VALUE_KEY,
      value: serializePerformers(nextPerformers),
    })
    triggerSaved()
  }

  const handlePerformerCommit = async (performerId: string) => {
    const draft = performerDrafts[performerId]
    if (!draft) return

    const nextPerformers = performers.map((performer) =>
      performer.id === performerId ? draft : performer,
    )

    if (JSON.stringify(nextPerformers) === JSON.stringify(performers)) return

    setPerformers(nextPerformers)
    await handlePerformersCommit(nextPerformers)
  }

  const handleAddPerformer = async () => {
    const nextPerformer = {
      id: crypto.randomUUID(),
      name: '',
      date: '',
      endDate: '',
      comment: '',
    }
    const nextPerformers = [
      ...performers,
      nextPerformer,
    ]
    setPerformers(nextPerformers)
    setPerformerDrafts((current) => ({
      ...current,
      [nextPerformer.id]: nextPerformer,
    }))
    await handlePerformersCommit(nextPerformers)
  }

  const handleDeletePerformer = async (performerId: string) => {
    const nextPerformers = performers.filter((performer) => performer.id !== performerId)
    setPerformers(nextPerformers)
    setPerformerDrafts((current) => {
      const next = { ...current }
      delete next[performerId]
      return next
    })
    await handlePerformersCommit(nextPerformers)
  }

  const handleExpenseChange = (expenseId: string, field: 'name' | 'label' | 'value', value: string) => {
    const fallback = expenses.find((expense) => expense.id === expenseId) ?? {
      id: expenseId,
      name: 'Transport',
      label: '',
      value: '',
    }

    setExpenseDrafts((current) => ({
      ...current,
      [expenseId]: {
        ...(current[expenseId] ?? fallback),
        [field]: value,
      },
    }))
  }

  const handleExpensesCommit = async (nextExpenses: ExpenseItem[]) => {
    if (!currentProjectId) return
    await setValue({
      projectId: currentProjectId,
      itemId: EXPENSES_VALUE_KEY,
      value: serializeExpenses(nextExpenses),
    })
    triggerSaved()
  }

  const handleExpenseCommit = async (expenseId: string) => {
    const draft = expenseDrafts[expenseId]
    if (!draft) return

    const nextExpenses = expenses.map((expense) =>
      expense.id === expenseId ? draft : expense,
    )

    if (JSON.stringify(nextExpenses) === JSON.stringify(expenses)) return

    setExpenses(nextExpenses)
    await handleExpensesCommit(nextExpenses)
  }

  const handleAddExpense = async () => {
    const nextExpense = {
      id: crypto.randomUUID(),
      name: 'Transport',
      label: '',
      value: '',
    }
    const nextExpenses = [...expenses, nextExpense]
    setExpenses(nextExpenses)
    setExpenseDrafts((current) => ({
      ...current,
      [nextExpense.id]: nextExpense,
    }))
    await handleExpensesCommit(nextExpenses)
  }

  const ids = allTaskIds()
  const checked = project?.checked ?? {}
  const savedValues = project?.values ?? {}
  const eventEndDate = draftValues[EVENT_END_DATE_VALUE_KEY] ?? ''
  const done = ids.filter((id) => checked[id] && savedValues[id]?.trim()).length
  const pct = ids.length ? Math.round((done / ids.length) * 100) : 0

  return (
    <div className={styles.root}>
      <header className={styles.topbar}>
        <span className={styles.brand}>Sonic Bloom</span>
        <span className={styles.brandSub}>Event Ops</span>
      </header>

      <main className={styles.main}>
        <div className={styles.projectBar}>
          <select
            className={styles.select}
            value={currentProjectId ?? ''}
            onChange={(event) => setCurrentProjectId(event.target.value)}
            disabled={!projects.length}
          >
            {projects.length === 0
              ? <option value="">- no events yet -</option>
              : projects.map((entry) => <option key={entry._id} value={entry._id}>{entry.name}</option>)}
          </select>
          <button className={styles.btnAccent} onClick={() => setShowModal(true)}>
            + New event
          </button>
          {currentProjectId ? (
            <button className={styles.btnDanger} onClick={handleDeleteProject}>
              Delete
            </button>
          ) : null}
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressMeta}>
            <span>{currentProjectId ? `${done} of ${ids.length} tasks complete` : '-'}</span>
            <span>{currentProjectId ? `${pct}%` : '-'}</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {!currentProjectId ? (
          <div className={styles.emptyState}>Create an event to get started.</div>
        ) : (
          <div className={styles.layout}>
            <DetailsPanel
              details={draftDetails}
              performers={performers}
              performerDrafts={performerDrafts}
              eventEndDate={eventEndDate}
              onDetailChange={handleDetailChange}
              onDetailCommit={(field, value) => void handleDetailCommit(field, value)}
              onEventEndDateChange={handleEventEndDateChange}
              onEventEndDateCommit={() => void handleEventEndDateCommit()}
              onPerformerChange={handlePerformerDraftChange}
              onPerformerCommit={(performerId) => void handlePerformerCommit(performerId)}
              onAddPerformer={() => void handleAddPerformer()}
              onDeletePerformer={(performerId) => void handleDeletePerformer(performerId)}
              onImageUpload={(files) => void handleImageUpload(files)}
              onRemoveImage={(index) => void handleRemoveImage(index)}
            />

            <section className={styles.phasesColumn}>
              {PHASES.map((phase) => (
                phase.id === 'expenses' ? (
                  <ExpensesBlock
                    key={phase.id}
                    phase={phase}
                    open={openPhaseId === phase.id}
                    expenses={expenses}
                    draftExpenses={expenseDrafts}
                    onToggleOpen={() => setOpenPhaseId((current) => current === phase.id ? null : phase.id)}
                    onExpenseChange={handleExpenseChange}
                    onExpenseCommit={(expenseId) => void handleExpenseCommit(expenseId)}
                    onAddExpense={() => void handleAddExpense()}
                  />
                ) : (
                  <PhaseBlock
                    key={phase.id}
                    phase={phase}
                    checked={checked}
                    values={savedValues}
                    draftValues={draftValues}
                    open={openPhaseId === phase.id}
                    onToggle={handleToggle}
                    onToggleOpen={() => setOpenPhaseId((current) => current === phase.id ? null : phase.id)}
                    onDraftValueChange={handleDraftValueChange}
                    onValueCommit={(itemId) => void handleValueCommit(itemId)}
                  />
                )
              ))}
            </section>
          </div>
        )}
      </main>

      <div className={`${styles.toast} ${saved ? styles.toastShow : ''}`}>Saved</div>

      {lightboxImage ? (
        <Lightbox src={lightboxImage} onClose={() => setLightboxImage(null)} />
      ) : null}

      {showModal ? (
        <div className={styles.modalBg} onClick={(event) => { if (event.target === event.currentTarget) setShowModal(false) }}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>New event</h3>
            <input
              className={styles.modalInput}
              type="text"
              placeholder="e.g. SF MoMA - June 2026"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') void handleCreateProject()
                if (event.key === 'Escape') setShowModal(false)
              }}
              autoFocus
            />
            <div className={styles.modalBtns}>
              <button className={styles.btnGhost} onClick={() => setShowModal(false)}>Cancel</button>
              <button className={styles.btnAccent} onClick={() => void handleCreateProject()}>Create</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function MissingConfig() {
  return (
    <div className={styles.root}>
      <header className={styles.topbar}>
        <span className={styles.brand}>Sonic Bloom</span>
        <span className={styles.brandSub}>Event Ops</span>
      </header>
      <main className={styles.main}>
        <div className={styles.emptyState}>
          Convex is not configured. Set <code>VITE_CONVEX_URL</code> before building this page.
        </div>
      </main>
    </div>
  )
}

export default function EventOps() {
  if (!convexClient) {
    return <MissingConfig />
  }

  return (
    <ConvexProvider client={convexClient}>
      <EventOpsContent />
    </ConvexProvider>
  )
}
