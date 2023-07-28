package io.dolby.sdk.comms.reactnative.view

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.widget.FrameLayout
import com.voxeet.android.media.MediaStream
import com.voxeet.sdk.views.VideoView

import io.dolby.sdk.comms.reactnative.R


class VideoViewWrapper(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : FrameLayout(context, attrs, defStyleAttr) {

  constructor(context: Context) : this(context, null)
  constructor(context: Context, attrs: AttributeSet?) : this(context, attrs, 0)

  val isAttached: Boolean
    get() = videoView?.isAttached ?: false

  private val videoView: VideoView?

  init {
    val root = LayoutInflater.from(context).inflate(R.layout.video_wrapper, this, true)
    videoView = root.findViewById(R.id.video_view)
  }

  fun attach(participantId: String, stream: MediaStream) {
    videoView?.attach(participantId, stream)
    requestLayout()
  }

  fun unAttach() {
    videoView?.unAttach()
    requestLayout()
  }

  fun setVideoFill() {
    videoView?.setVideoFill()
  }

  fun setVideoFit() {
    videoView?.setVideoFit()
  }

  fun setMirror(mirror: Boolean) {
    videoView?.isMirror = mirror
  }

  override fun requestLayout() {
    super.requestLayout()
    post {
      measure(
        MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
        MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
      )
      layout(left, top, right, bottom)
    }
  }
}
