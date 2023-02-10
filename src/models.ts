class Campaign {
  id : number | null = null
  name: string | null = null
  created_date: string = Date.now().toLocaleString()
  launch_date: string = Date.now().toLocaleString()
  send_by_date: string | null = null
  completed_date: string | null = null
}